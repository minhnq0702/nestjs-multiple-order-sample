.DEFAULT_GOAL := all

.PHONY: default

run-redis:
	docker run -p 6379:6379 --name redis-dev -d redis

run-ab-order:
	docker run --rm --read-only -v `pwd`:`pwd` -w `pwd` jordi/ab -T application/json -p ./ab-create-order.json -n 1000 -c 5 -s 2 http://host.docker.internal:3000/orders