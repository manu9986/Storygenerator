# Story Generator

## 📌 Project Overview
This is an AI-powered **Story Generator** that creates engaging stories based on uploaded images. It utilizes **Flask** for the web framework, **OpenAI GPT** for text generation, and **BLIP (Bootstrapped Language Image Pretraining)** for image captioning.

## 🚀 Features
- Upload multiple images to generate a story.
- Select a genre (Comedy, Horror, Action, Romance, Fantasy, Mystery, etc.).
- Choose word count for the generated story.
- Uses **OpenAI's GPT-3.5** for generating creative stories.
- Uses **BLIP** for generating captions from images.
- Web-based interface using Flask.

---

## 🛠️ Tech Stack
- **Python** (Backend logic)
- **Flask** (Web framework)
- **OpenAI API** (Story generation)
- **Transformers (BLIP)** (Image captioning)
- **HTML, CSS, JavaScript** (Frontend)
- **PIL (Pillow)** (Image processing)

---

## 🔧 Installation
### 1️⃣ Clone the repository
```sh
git clone https://github.com/manu9986/Storygenerator.git
cd Storygenerator
```

### 2️⃣ Create and activate a virtual environment (optional but recommended)
```sh
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

### 3️⃣ Install dependencies
```sh
pip install -r requirements.txt
```

### 4️⃣ Set up OpenAI API Key
Replace `your-openapi-key-here` in **app.py** with your OpenAI API key:
```python
openai.api_key = "your-openapi-key-here"
```

---

## ▶️ Running the Application
Start the Flask server:
```sh
python app.py
```
Then, open **http://127.0.0.1:5000/** in your browser.

---

## 📸 How It Works
1. **Upload images**
2. **Select a genre**
3. **Choose the word count**
4. **Click 'Generate Story'**
5. **Enjoy the AI-generated story!**

---

## 📁 Project Structure
```
📂 Storygenerator
│── 📄 app.py                 # Main Flask app
│── 📄 requirements.txt       # Dependencies
│── 📂 templates/
│   ├── index.html           # Web UI
│── 📂 static/
│   ├── styles.css           # CSS Styling
│   ├── script.js            # Client-side JavaScript
│── 📄 .gitignore             # Ignore unnecessary files
```

---

## 📝 Future Improvements
- Add user authentication
- Improve UI/UX
- Support real-time narration
- Multi-language support

---

## 🤝 Contributing
Feel free to fork, improve, and submit pull requests! 🚀

---

## 🛑 License
This project is open-source under the **MIT License**.

---

### 🎯 Happy Storytelling! ✨

