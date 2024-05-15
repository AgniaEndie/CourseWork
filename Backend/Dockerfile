# Этап, на котором выполняются подготовительные действия
#FROM python:3.12 as builder

#RUN pip wheel --no-cache-dir --no-deps --wheel-dir /wheels flask psycopg2

# Финальный этап
FROM python:3.12-slim
COPY src tmp
WORKDIR tmp

#COPY --from=builder /wheels /wheels
RUN pip install -r requirements.txt
ENTRYPOINT ["python3","starter.py"]