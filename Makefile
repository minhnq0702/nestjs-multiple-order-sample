.DEFAULT_GOAL := all

.PHONY: default

run-redis:
	docker run -p 6379:6379 --name redis-dev -d redis

run-ab-order:
	docker run --rm --read-only -v `pwd`:`pwd` -w `pwd` jordi/ab -T application/json -p ./ab-create-order.json -n 100 -c 25 -s 2 http://host.docker.internal:3000/orders/benchmark-over-qty

run-ab-login:
	docker run --rm --read-only -v `pwd`:`pwd` -w `pwd` jordi/ab -T application/json -p ./ab-login.json -n 500 -c 50 -s 2 http://host.docker.internal:3000/auth/login