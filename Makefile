build:
		docker build . --tag stafeeva:latest

run:
		docker run -p 9998:80 stafeeva:latest
