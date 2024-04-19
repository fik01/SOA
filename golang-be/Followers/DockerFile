#get a base image
FROM golang:alpine

WORKDIR /go/src/app
COPY . .

RUN go mod tidy
RUN go build

CMD ["./GolangNeo4j"]
