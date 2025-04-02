from flask import Flask, request, jsonify, render_template
from PIL import Image
import openai
import torch
from transformers import BlipProcessor, BlipForConditionalGeneration

app = Flask(__name__)
openai.api_key = "your-openapi-key-here"
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

genre_prompts = {
    "Comedy": "Make the story humorous and lighthearted.",
    "Horror": "Make the story spooky and suspenseful.",
    "Action": "Make the story fast-paced and thrilling.",
    "Romance": "Make the story romantic and heartwarming.",
    "Fantasy": "Make the story magical and imaginative.",
    "Mystery": "Make the story mysterious and intriguing.",
}

@app.route("/")
def home():
    return render_template("index.html")

def generate_caption(image):
    inputs = processor(images=image, return_tensors="pt")
    output = model.generate(**inputs)
    return processor.decode(output[0], skip_special_tokens=True)

@app.route("/generate-story", methods=["POST"])
def generate_story():
    word_count = int(request.form.get("wordCount", 150))
    genres = request.form.get("genres", "general").split(",")
    images = request.files.getlist("images")

    captions = []
    for img_file in images:
        img = Image.open(img_file).convert("RGB")
        caption = generate_caption(img)
        captions.append(caption)

    captions_text = " ".join(captions)
    genre_text = ", ".join(genres)
    style_prompt = genre_prompts.get(genres[0], "Make the story engaging.")

    prompt = (
        f"Create a {genre_text} story in approximately {word_count} words. "
        f"{style_prompt} Based on these image descriptions: {captions_text}."
    )

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a story generator."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=int(word_count * 1.5),
            temperature=0.7,
            timeout=20  # 20-second timeout
        )
        story = response['choices'][0]['message']['content'].strip()
        return jsonify({"story": story})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"story": "Failed to generate story."}), 500

if __name__ == "__main__":
    app.run(debug=True)
