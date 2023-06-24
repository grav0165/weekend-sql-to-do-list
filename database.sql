CREATE TABLE "weekend-to-do-app" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(120),
    "completed" BOOLEAN DEFAULT FALSE
);

INSERT INTO "weekend-to-do-app"
("task")
VALUES
('wash car'),
('wash cat'),
('wash other cat'),
('wash dishes'),
('wash clothes'),
('wash money'),
('clean washing machine');

SELECT * FROM "weekend-to-do-app";