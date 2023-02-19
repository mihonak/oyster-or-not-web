import torch
import torch.nn as nn
from torchvision.transforms import transforms
from PIL import Image

class ConvNet(nn.Module):
    def __init__(self, num_classes=2):
        super(ConvNet, self).__init__()

        self.conv1 = nn.Conv2d(in_channels=3, out_channels=12, kernel_size=3, stride=1, padding=1)
        self.bn1 = nn.BatchNorm2d(num_features=12)
        self.relu1 = nn.ReLU()

        self.pool = nn.MaxPool2d(kernel_size=2)

        self.conv2 = nn.Conv2d(in_channels=12, out_channels=20, kernel_size=3, stride=1, padding=1)
        self.relu2 = nn.ReLU()

        self.conv3 = nn.Conv2d(in_channels=20, out_channels=32, kernel_size=3, stride=1, padding=1)
        self.bn3 = nn.BatchNorm2d(num_features=32)
        self.relu3 = nn.ReLU()

        self.fc = nn.Linear(in_features=32*150*150, out_features=num_classes)

    def forward(self, input):
        output = self.conv1(input)
        output = self.bn1(output)
        output = self.relu1(output)

        output = self.pool(output)
        
        output = self.conv2(output)
        output = self.relu2(output)

        output = self.conv3(output)
        output = self.bn3(output)
        output = self.relu3(output)

        output = output.view(-1,32*150*150)

        output = self.fc(output)

        return output

def predict_oyster_or_not(path):

    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

    transformer = transforms.Compose([
        transforms.Resize((300,300)),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        transforms.Normalize([0.5,0.5,0.5],
                            [0.5,0.5,0.5])
    ])

    the_model = ConvNet()
    the_model.load_state_dict(torch.load('functions/best_checkpoint.model'))
    the_model.eval()

    img = Image.open(path)
    print(img.mode)
    if img.mode != 'RGB':
        img = img.convert('RGB')
    input = transformer(img)
    input = input.unsqueeze(0).to(device)
    outputs = the_model(input)
    prediction = torch.argmax(outputs)
    if prediction == 1:
        return True
    else:
        return False
