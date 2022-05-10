/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { validationSchema } from "./utils/validationSchema";
import { useFormik } from "formik";
import { Button, Typography } from "@mui/material";

import data from "./data/scoring.json";

const Calculator = () => {
  const [inputValue, setInputValue] = useState();
  const [scoreTotal, setScoreTotal] = useState(0);
  const [dataProbability, setDataProbability] = useState(0);
  const [scoreProbability, setScoreProbability] = useState(0);
  const [showScores, setShowScores] = useState(false);

  const formik = useFormik({
    initialValues: {
      anemia: "",
      creatin: "",
      triglecirid: "",
      cpb: "",
      frakcia: "",
      infarct: "",
      porajenie: "",
      killip: "",
      pnevmonia: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleCalculateScore(values);
    },
  });

  const handleDefaultScore = () => {
    const score = { ...data };
    const scoreArray = [];
    Object.values(score).forEach((val) => scoreArray.push(val.score));
    return scoreArray.reduce((partialTotal, a) => partialTotal + a, 0);
  };

  const handleCalculateScore = (values) => {
    const converted = convertValues(values);
    setInputValue(converted);

    const infoScore = { ...data };
    let resScoring = [];

    Object.entries(infoScore).forEach((val) => {
      const [key, value] = val;

      if (key === "anemia") {
        resScoring.push(converted.creatin * value.score);
      }
      if (key === "creatin") {
        resScoring.push(converted.creatin * value.score);
      }
      if (key === "triglecirid") {
        resScoring.push(converted.triglecirid * value.score);
      }
      if (key === "cpb") {
        resScoring.push(converted.cpb * value.score);
      }
      if (key === "frakcia") {
        resScoring.push(converted.frakcia * value.score);
      }
      if (key === "infarct") {
        resScoring.push(converted.infarct * value.score);
      }
      if (key === "porajenie") {
        resScoring.push(converted.porajenie * value.score);
      }
      if (key === "killip") {
        resScoring.push(converted.killip * value.score);
      }
      if (key === "pnevmonia") {
        resScoring.push(converted.pnevmonia * value.score);
      }
    });
    setScoreTotal(calculateTotal(resScoring));
  };

  const calculateTotal = (resScoring) => {
    return resScoring.reduce((partialTotal, a) => partialTotal + a, 0);
  };

  const convertValues = (values) => {
    return {
      ...values,
      anemia: +values.anemia,
      creatin: +values.creatin,
      triglecirid: +values.triglecirid,
      cpb: +values.cpb,
      frakcia: +values.frakcia,
      infarct: +values.infarct,
      porajenie: +values.porajenie,
      killip: +values.killip,
      pnevmonia: +values.pnevmonia,
    };
  };

  const handleDataProbability = (scoreValues) => {
    let outcomeProb = [];

    Object.entries(data).forEach((val) => {
      const [key, value] = val;
      const rountScoreValue =
        Math.round((value.score / scoreValues) * 100 * 10) / 10; // round with a decimal in percent
      if (
        key === "anemia" ||
        key === "creatin" ||
        key === "triglecirid" ||
        key === "cpb" ||
        key === "frakcia" ||
        key === "infarct" ||
        key === "porajenie" ||
        key === "killip" ||
        key === "pnevmonia"
      ) {
        outcomeProb.push({ score: rountScoreValue, type: [key] });
      }
    });
    setDataProbability(outcomeProb);
  };

  const handleScoreProbability = () => {
    let result = [];
    dataProbability.forEach((prob) => {
      if (prob.type.includes("anemia")) {
        result.push(prob.score * inputValue.anemia);
      }
      if (prob.type.includes("creatin")) {
        result.push(prob.score * inputValue.creatin);
      }
      if (prob.type.includes("triglecirid")) {
        result.push(prob.score * inputValue.triglecirid);
      }
      if (prob.type.includes("cpb")) {
        result.push(prob.score * inputValue.cpb);
      }
      if (prob.type.includes("frakcia")) {
        result.push(prob.score * inputValue.frakcia);
      }
      if (prob.type.includes("infarct")) {
        result.push(prob.score * inputValue.infarct);
      }
      if (prob.type.includes("porajenie")) {
        result.push(prob.score * inputValue.porajenie);
      }
      if (prob.type.includes("killip")) {
        result.push(prob.score * inputValue.killip);
      }
      if (prob.type.includes("pnevmonia")) {
        result.push(prob.score * inputValue.pnevmonia);
      }
    });
    setScoreProbability(calculateTotal(result));
  };

  useEffect(() => {
    const defaultScore = handleDefaultScore();
    handleDataProbability(defaultScore);
  }, [scoreTotal]);

  useEffect(() => {
    if (inputValue && dataProbability.length) {
      handleScoreProbability();
      setShowScores(true);
    }
  }, [inputValue, dataProbability]);

  return (
    <Container maxWidth="md">
      <Box>
        <Typography
          variant="h4"
          sx={{ my: 3, textAlign: "center", color: "#1976d2" }}
        >
          Калькулятор Скоринга
        </Typography>
        <Box>
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                "& .MuiTextField-root": { mb: 3, mx: 0, width: "25ch" },
                "& .MuiFormControl-root": { width: "100%" },
              }}
              autoComplete="off"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 3,
                }}
              >
                <TextField
                  fullWidth
                  id="anemia"
                  name="anemia"
                  label="Анемия"
                  value={formik.values.anemia}
                  placeholder="Анемия"
                  onChange={formik.handleChange}
                  error={formik.touched.anemia && Boolean(formik.errors.anemia)}
                  helperText={formik.touched.anemia && formik.errors.anemia}
                  sx={{ width: "100%" }}
                />
                <TextField
                  id="creatin"
                  name="creatin"
                  label="Креатинин увеличение каждые > 120 мкмоль/л"
                  value={formik.values.creatin}
                  placeholder="Креатинин увеличение каждые > 120 мкмоль/л"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.creatin && Boolean(formik.errors.creatin)
                  }
                  helperText={formik.touched.creatin && formik.errors.creatin}
                  sx={{ width: "100%" }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 2,
                }}
              >
                <TextField
                  id="triglecirid"
                  name="triglecirid"
                  label="Триглицериды выше 2,3"
                  value={formik.values.triglecirid}
                  placeholder="Триглицериды выше 2,3"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.triglecirid &&
                    Boolean(formik.errors.triglecirid)
                  }
                  helperText={
                    formik.touched.triglecirid && formik.errors.triglecirid
                  }
                />
                <TextField
                  id="cpb"
                  name="cpb"
                  label="СРБ ≥ больше 5Б"
                  value={formik.values.cpb}
                  placeholder="СРБ ≥ больше 5"
                  onChange={formik.handleChange}
                  error={formik.touched.cpb && Boolean(formik.errors.cpb)}
                  helperText={formik.touched.cpb && formik.errors.cpb}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 2,
                }}
              >
                <TextField
                  id="frakcia"
                  name="frakcia"
                  label="Фракция выброса меньше (Znachenia EF ≤ 40%)"
                  value={formik.values.frakcia}
                  placeholder="Фракция выброса меньше (Znachenia EF ≤ 40%)"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.frakcia && Boolean(formik.errors.frakcia)
                  }
                  helperText={formik.touched.frakcia && formik.errors.frakcia}
                />
                <TextField
                  id="infarct"
                  name="infarct"
                  label="Infarct с подъемом"
                  value={formik.values.infarct}
                  placeholder="Infarct с подъемом"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.infarct && Boolean(formik.errors.infarct)
                  }
                  helperText={formik.touched.infarct && formik.errors.infarct}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 2,
                }}
              >
                <TextField
                  id="porajenie"
                  name="porajenie"
                  label="Porajenie_0stvola"
                  value={formik.values.porajenie}
                  placeholder="Porajenie_0stvola"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.porajenie && Boolean(formik.errors.porajenie)
                  }
                  helperText={
                    formik.touched.porajenie && formik.errors.porajenie
                  }
                />
                <TextField
                  id="killip"
                  name="killip"
                  label="Killip 4"
                  value={formik.values.killip}
                  placeholder="Killip 4"
                  onChange={formik.handleChange}
                  error={formik.touched.killip && Boolean(formik.errors.killip)}
                  helperText={formik.touched.killip && formik.errors.killip}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <TextField
                  id="pnevmonia"
                  name="pnevmonia"
                  label="Пневмония"
                  value={formik.values.pnevmonia}
                  placeholder="Пневмония"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.pnevmonia && Boolean(formik.errors.pnevmonia)
                  }
                  helperText={
                    formik.touched.pnevmonia && formik.errors.pnevmonia
                  }
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                }}
              >
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Рассчитать
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
      <Box>
        {showScores && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5">
              Итоговые баллы: {scoreTotal.toFixed(2)}
            </Typography>
            <Typography variant="h5">
              Вероятность исхода в:
              {` ${Math.round(scoreProbability * 10) / 10} %`}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Calculator;
