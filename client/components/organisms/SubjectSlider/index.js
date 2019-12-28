import React, { useRef, useMemo } from 'react';
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
  const onPrev = () => slider.current.slickPrev();
  const onNext = () => slider.current.slickNext();

  return (
    <div
      className={clsx(
        'organism_subject-slider',
        subjects.length === 0 && 'no-data',
        subjects.length < 3 && 'no-arrows',
        className,
      )}
    >
      {subjects.length > 0
        ? (
          <>
            {subjects.length > 3 && (
            <Arrow
              onClick={onPrev}
              className="organism_subject-slider-arrow prev"
            />
            )}
            <Slider
              ref={slider}
              arrows={false}
              slidesToShow={4}
              slidesToScroll={1}
              className="center"
              responsive={breakponts}
              infinite={subjects.length > 3}
            >
              {subjects.map(({ name, boardName, levelName }) => (
                <SubjectCard
                  subject={name}
                  code={`${boardName} ${levelName}`}
                  subjectName={name}
                />
              ))}
            </Slider>
            { subjects.length > 3 && (
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
