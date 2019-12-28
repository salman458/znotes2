import React, {
  useState, useRef, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Slider from 'react-slick';
import { GenerateBreakpoints } from '/client/utils';
import { Arrow } from '/client/components/icons';
import { Title } from '/client/components/atoms';
import { SubjectCard } from '/client/components/molecules';
import './styles.scss';

const SubjectSlider = ({ subjects, className }) => {
  const breakponts = useMemo(GenerateBreakpoints, []);
  const slider = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(0);

  const ref = useCallback((node) => {
    if (node !== null) {
      slider.current = node;
      setSlidesToShow(node.innerSlider.props.slidesToShow);
    }
  }, []);

  const onPrev = () => slider.current.slickPrev();
  const onNext = () => slider.current.slickNext();

  const onSlidesToShowCountChange = () => {
    const newCount = slider.current.innerSlider.props.slidesToShow;
    if (newCount !== slidesToShow) {
      setSlidesToShow(newCount);
    }
  };

  return (
    <div
      className={clsx(
        'organism_subject-slider',
        subjects.length === 0 && 'no-data',
        subjects.length <= slidesToShow && 'no-arrows',
        className,
      )}
    >
      {subjects.length > 0
        ? (
          <>
            {subjects.length > slidesToShow && (
            <Arrow
              onClick={onPrev}
              className="organism_subject-slider-arrow prev"
            />
            )}
            <Slider
              ref={ref}
              arrows={false}
              slidesToShow={4}
              slidesToScroll={1}
              className="center"
              responsive={breakponts}
              infinite={subjects.length > 3}
              onReInit={onSlidesToShowCountChange}
            >
              {subjects.map(({ name, boardName, levelName }) => (
                <SubjectCard
                  key={name}
                  subject={name}
                  code={`${boardName} ${levelName}`}
                  subjectName={name}
                />
              ))}
            </Slider>
            { subjects.length > slidesToShow && (
            <Arrow
              onClick={onNext}
              className="organism_subject-slider-arrow next"
            />
            )}
          </>
        )
        : (
          <Title variant="h6">Nothing to show</Title>
        )}
    </div>
  );
};

SubjectSlider.defaultProps = {
  className: '',
};

SubjectSlider.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
};

export default SubjectSlider;
