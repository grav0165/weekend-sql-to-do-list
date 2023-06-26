CREATE TABLE "weekend-to-do-app" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(120),
    "completed" BOOLEAN DEFAULT FALSE,
    "timestamp" TIMESTAMP,
    "completed_time" TIMESTAMP
);

INSERT INTO "weekend-to-do-app"
("task", "timestamp")
VALUES
('wash car', CURRENT_TIMESTAMP),
('wash cat', CURRENT_TIMESTAMP),
('wash other cat', CURRENT_TIMESTAMP),
('wash dishes', CURRENT_TIMESTAMP),
('wash clothes', CURRENT_TIMESTAMP),
('wash money', CURRENT_TIMESTAMP),
('clean washing machine', CURRENT_TIMESTAMP);


SELECT * FROM "weekend-to-do-app";