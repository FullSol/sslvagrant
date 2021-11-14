import sys

print("Welcome to the Grader application.")

# Define the grader function that
class grader:
    def __init__(self, name, score):
        self.name = name

        #check if the given score is numerical
        if score.isdigit():
            #if the check passes save the score
            self.score = int(score)
        else:
            #if the score is not a number - error message
            print("please ensure the score is a numerical value between 0 and 100")
            sys.exit()
        
        #check if the number is too high, no extra credit given in this program
        if self.score > 100:
            #error message
            print("please ensure the score is a numerical value between 0 and 100")
            sys.exit()

        #not accepting scores lower than 0
        if self.score < 0:
            #error message
            print("please ensure the score is a numerical value between 0 and 100")
            sys.exit()
    
    #method tp provide the correct grade for the given score
    def grade(self):
        grade = 0

        #conditional to choose the score
        if self.score >= 90:
            grade = "an A"

        elif self.score >= 80:
             grade = "a B"

        elif self.score >= 70:
             grade = "a C"
        
        elif self.score >= 60:
             grade = "a D"
        
        else:
             grade = "an F"

        #print the final result
        print("With a score of " + str(self.score) + ' ' + self.name + "'s grade is " + grade)
    
#Request the name of the student and score from the user
name = raw_input("What is the student's name?")
score = raw_input("Please enter the score of the assignment you wish to grade ")

#initiate the object
g = grader(name, score)

#Run the method to print the grade
g.grade()


