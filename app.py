from flask import Flask, request, jsonify
import time

app = Flask(__name__)

correct_answers = [
    'Answer1', 'Answer2', 'Answer3', 'Answer4', 'Answer5',
    'Answer6', 'Answer7', 'Answer8', 'Answer9', 'Answer10',
    'Answer11', 'Answer12', 'Answer13', 'Answer14', 'Answer15',
    'Answer16', 'Answer17', 'Answer18', 'Answer19', 'Answer20',
    'Answer21', 'Answer22', 'Answer23', 'Answer24', 'Answer25'
]

grade_mapping = {
    'A': 3,
    'B': 2,
    'C': 1
}

last_submit_time = 0

@app.route('/submit', methods=['POST'])
def submit():
    global last_submit_time
    data = request.json
    student_id = data.get('student_id')
    answers = data.get('answers')

    current_time = time.time()
    if current_time - last_submit_time < 60:
        return jsonify({'error': 'You can submit answers once every minute.'}), 429

    last_submit_time = current_time

    student_grade = 'B'

    correct_count = sum(1 for i, answer in enumerate(answers) if answer.strip().lower() == correct_answers[i].lower())

    if student_grade in grade_mapping:
        correct_count += grade_mapping[student_grade]

    return jsonify({'correct_count': correct_count})

if __name__ == '__main__':
    app.run(debug=True)
