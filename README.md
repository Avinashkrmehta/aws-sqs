# Complete SQS Queue Example
Configuration in this directory creates
- FIFO (first-in, first-out) queue
- Unencrypted queue (encryption disabled)
- Queue encrypted with customer managed KMS key
- Queue encrypted with default SQS SSE (server-side encryption) w/ separate dead-letter queue
  - Dead letter queue created in separate module definition
- Queue with dead-letter queue created in the same module defintion w/ queue policies for both the source queue and dead-letter queue
- Disabled queue (no resources created)


# Below are the docker command to run the app in container.

In the above repository, we can produce and consume the message from sqs.

Docker Commands:-
- sudo docker build -f Dockerfile -t datamart .
- sudo docker ps
- sudo docker images
- sudo docker container ls

- sudo docker run datamart


- sudo docker stop CONTAINER [container id]
- sudo docker-compose up

- sudo docker-compose up datamart

 - sudo docker image rm -f 
