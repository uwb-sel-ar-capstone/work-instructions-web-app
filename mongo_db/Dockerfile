# syntax=docker/dockerfile:1
FROM mongo

RUN mkdir -p /data/restore
WORKDIR /data/restore

COPY ./mongo_db_data .

# display directory address
RUN pwd
#display files in directory
RUN ls -a

EXPOSE 27017
RUN mongod & \
    sleep 5s && \
    mongorestore . && \
    mongod --shutdown
CMD ["mongod", "--quiet", "--logpath", "/dev/null"]