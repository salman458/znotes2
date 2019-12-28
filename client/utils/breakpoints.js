const GenerateBreakpoints = () => {
  const initialNumber = 4;
  const breakpointValues = [1380, 1100, 499];
  return breakpointValues.map((currentPoint, index) => {
    const slidesToShow = initialNumber - (index + 1);
    return {
      breakpoint: currentPoint,
      settings: {
        slidesToShow,
      },
    };
  });
};

export default GenerateBreakpoints;
