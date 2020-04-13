import React, {
  useState, useRef, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Slider from 'react-slick';
import { GenerateBreakpoints } from '/client/utils';
import { Arrow } from '/client/components/icons';
import { usePermission } from '/client/contexts/permission';
import { Title } from '/client/components/atoms';
import { SubjectCard } from '/client/components/molecules';
import './styles.scss';

const SubjectSlider = ({
  subjects, isUserSubjects, user, className, boardSlugName, levelSlugName, boardId, levelId,
}) => {
  const breakponts = useMemo(GenerateBreakpoints, []);
  const slider = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(0);
  const role = usePermission();

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
              {subjects.map(({
                _id: subjectId, 
                name, 
                boardName, 
                levelName, 
                slug: subjectNameSlug,
                board,
                level,
                boardSlugName:boardSlug,
                levelSlugName:levelSlug
              }) => (
                <SubjectCard
                  role={role}
                  id={subjectId}
                  subject={name}
                  key={subjectId}
                  isUserSubject={isUserSubjects}
                  code={`${boardName} ${levelName}`}
                  subjectName={name}
                  subjectNameSlug={subjectNameSlug}
                  levelSlugName={levelSlugName|| levelSlug}
                  boardSlugName={boardSlugName || boardSlug}
                  boardId={boardId || board}
                  levelId={levelId || level}
                  user={user}
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
  isUserSubjects: false,
};

SubjectSlider.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.object).isRequired,
  isUserSubjects: PropTypes.bool,
  className: PropTypes.string,
};

export default SubjectSlider;
