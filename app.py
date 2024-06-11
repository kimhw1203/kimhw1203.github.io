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

def check_bingo(board):
    bingo_count = 0
    # Check rows
    for row in range(5):
        if all(board[row * 5 + col] for col in range(5)):
            bingo_count += 1
    # Check columns
    for col in range(5):
        if all(board[row * 5 + col] for row in range(5)):
            bingo_count += 1
    # Check diagonals
    if all(board[i * 5 + i] for i in range(5)):
        bingo_count += 1
    if all(board[i * 5 + (4 - i)] for i in range(5)):
        bingo_count += 1
    return bingo_count

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

    student_grade = 'B'  # 예제에서는 B등급 학생으로 고정

    correct_count = sum(1 for i, answer in enumerate(answers) if answer.strip().lower() == correct_answers[i].lower())

    if student_grade in grade_mapping:
        correct_count += grade_mapping[student_grade]

    # Create a board to check for bingo
    board = [answer.strip().lower() == correct_answers[i].lower() for i, answer in enumerate(answers)]
    
    bingo_count = check_bingo(board)

    return jsonify({'correct_count': correct_count, 'bingo_count': bingo_count})

if __name__ == '__main__':
    app.run(debug=True)
