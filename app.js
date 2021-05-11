const sharp = require("sharp");

const hexCal = (dec) => {
  return Math.round(dec.mean).toString(16);
};

const getHexColor = async (data) => {
  const {
    channels: [rc, gc, bc],
  } = await sharp(data).stats();
  return `#${hexCal(rc)}${hexCal(gc)}${hexCal(bc)}`;
};

const imgAvgCal = async (imagePath) => {
  const image = sharp(imagePath);
  const { width, height } = await image.metadata();
  const data = await image.extract({ left: 0, top: 0, width, height }).toBuffer();
  const hexColor = await getHexColor(data);
  return hexColor;
};

const app = async () => {
  const result = await imgAvgCal("image.png");
  console.log(result);
};

app();
