import sys

name = raw_input("What is your name?? ")

print("Welcome, " + name)

f = open("thefile.txt", 'w')
f.write("Someone is inputting text and it's, " + name)
f.close()

f = open("thefile.txt", 'r')
print(f.read())
f.close()
