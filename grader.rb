puts "Welcome to the Grader application."

# Define the grader class
class Grader
    def initialize(name, score)
        @@name = name
        @@score = score
    end

    def getGrade
        if @@score >= 90
           grade = "an A"

        elsif @@score >= 80
             grade = "a B"

        elsif @@score >= 70
             grade = "a C"
        
        elsif @@score >= 60
             grade = "a D"
        
        else
             grade = "an F"
        end

        puts "#@@name's grade is " + grade
    end
end
    
#Request the name of the student and score from the user
puts "What is the student's name?"
name = gets

integerCheck = false

while !integerCheck
    puts "Please enter the score of the assignment you wish to grade "
    user_input = gets

    #0 not working and I don't understand why that is...
    #triend check this every possible way I could think of "0", 0, .to_s nothing catches here. There isn't an error it just skip to the elsif until I put an int other than 0
    if user_input.to_i.to_s == user_input
        score = user_input.to_i
        integerCheck = true
    elsif user_input.to_i == 0 || user_input.to_i < 0 || user_input.to_i > 100
        puts "Please enter an integer between 0 and 100"
    else
        score = user_input.to_i
        integerCheck = true
    end
end

#initiate the object
g = Grader.new(name, score)

#Run the method to print the grade
g.getGrade()


