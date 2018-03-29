VERSION=0.1
TAG=makeshiftsoftware/vsnet-auth:$(VERSION)

build:
	docker build -f Dockerfile.dev --tag $(TAG) .

push:
	docker push $(TAG)

deploy-all: deploy-rs deploy-service

deploy-rs:
	kubectl apply -f ./infrastructure/dev/deployment.yaml

deploy-service:
	kubectl apply -f ./infrastructure/dev/service.yaml