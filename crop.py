from PIL import Image

# Open the image
img = Image.open('assets/ftc-news-collab.jpg')
width, height = img.size

# We want to crop out the text. The logos are probably in the middle.
# Let's crop from y=350 to y=650 (height 300)
# Width can stay the same, or we can crop a bit of the sides.
left = 50
top = 340
right = width - 50
bottom = 560

cropped = img.crop((left, top, right, bottom))
cropped.save('assets/ftc-news-collab-cropped.jpg')

