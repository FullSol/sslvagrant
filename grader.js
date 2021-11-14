const readline = require('readline');

//Class for the Grader
class Grader{
    
    //constructor to do all of the work.
    constructor(name, assignment, score){
        this.name = name;
        this.assignment = assignment
        this.score = score;
        this.grade = this.setGrade(this.score)
    }     

    //Method to find the value of the score
    setGrade(s){
        let grade = '';

        if (s >= 90) {
            grade = "an A"
        } 
        else if (s >= 80) {
            grade = "a B"
        } 
        else if (s >= 70) {
            grade = "a C"
        } 
        else if (s >= 60) {
            grade = "a D"
        } 
        else  grade = "an F"

        return grade;
    }

    //Formatted text output
    getGrade(){
        return this.name + "'s score of " + this.score + " is " + this.grade
    }
}

//create an interface to the console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

//Ask the user the required questions
rl.question("What is the student's name?", (name) =>{
    rl.question("What is their assignment?", (assignment) => {
        rl.question("What is their score for the assignment?", (score) =>{
            
            //validation
            if (score > 100 || score < 0){
                console.log('Please enter a score value between 0 and 100.')
            } else {
                let studentGrade = new Grader(name, assignment, score);
                console.log(studentGrade.getGrade());
            }
            //Close the interface     
            rl.close();
        });
    })
}, )