# syntax=docker/dockerfile:1
FROM mongo

# Create a directory to store the backup files
RUN mkdir -p /restore

# Copy the backup files to the container
COPY mongo_db_data/* /restore/

EXPOSE 27017

# Start the mongod process in the background
CMD ["mongod", "--quiet", "--logpath", "/dev/null"]