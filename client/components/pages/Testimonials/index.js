import React, { useRef } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

import { IconButton, FlexBox, Title } from "/client/components/atoms";
import { ChevronLeft, ChevronRight } from "/client/components/icons";
import Quote from "./Quote";

const Testimonials = ({ progress }) => {
  const slider = useRef(null);
  const onPrev = () => slider.current.slickPrev();
  const onNext = () => slider.current.slickNext();
  return (
    <FlexBox
      align
      column
      justify
      fullWidth
      className="page_testimonials-container"
      style={{
        opacity: `calc(${progress == 0 ? 1 : progress + 0.5})`
      }}
    >
      <Title
        variant="h3"
        gutterBottom
        style={{
          transform: `translate3d(calc(-10vw + 10vw * ${progress == 0
            ? progress + 1
            : progress}), 0, 0)`
        }}
      >
        Testimonials
      </Title>
      <div className="slider-container">
        <Slider
          // infinite
          // centerMode
          ref={slider}
          arrows={false}
          slidesToShow={3}
          slidesToScroll={1}
          className="center"
        >
          <Quote author="Adeen Atif">
            I&apos;ve always been that kind of student who despised theory parts
            of a subject and loved &apos;to the point&apos; explanations. And
            therefore course books were never a big help. Plus writing long
            notes was also a big struggle. But ever since I found ZNotes,
            I&apos;ve never felt any more relieved about the upcoming exams.
            It&apos;s like a bundle of only important and necessary concepts
            packed together in a PDF form. I even managed to get A* in Chemistry
            and A in Physics IGCSE exams.I&apos;d highly recommend them to
            students who are stressed about the upcoming exams or even a simple
            school test. ZNotes are highly reliable!
          </Quote>
          <Quote author="Ravindu Edirisinghe">
            Thank you very much to the people who made such notes. May God
            increase your knowledge and keep showering His blessings on you
            guys. Lots of love.
          </Quote>
          <Quote author="Mushfiq">
            I hope to see A2 notes for Computer Science soon and can’t wait for
            this site to be more well-recognized and appreciated. I have already
            spread word of this site to NYC classmates and on their behalf I
            would like to thank you again, so thank you very much and keep up
            the great work!
          </Quote>
          <Quote author="Christine">
            I found myself in a time of darkness, completely lost and devastated
            from my upcoming exams (my own fault as instead of revision I’ve
            been playing Skyrim and bingeing Netflix) but you sir, are a man of
            culture and have saved me from certain doom. I would just like to
            congratulate you on all the good you’ve done for humanity and I
            believe many others will agree with me. What you have done for
            humanity is unheard of and you deserve a knighthood. Whenever I
            believe that humans have strayed too far from God, I think of the
            creator of ZNotes and my heart is at peace. Thank you for being a
            legend.
          </Quote>
          <Quote author="Anonymous">
            Asalam Alaikom brother. Thank you so much for sharing these notes
            with others. I’m very grateful for your help. Wish there’ll be more
            good people like. Stay safe!
          </Quote>
          <Quote author="Toby A">
            yo yo yo guys.... One would truly and genuinely appreciate thine
            notes being thrust onto the infinite and tragic medium that is the
            internet! One would receive much better International General
            Certificate of Secondary Education Business Studies grades as a
            result and therefore have a brighter and more fulfilling future in
            the overwhelming world of humanity. Thank you eternally in advance!
          </Quote>
          <Quote author="Anonymous">
            These notes are absolutely amazing and have motivated me towards
            getting A*s in my A level. Your guidelines are also very helpful.
            Lots of prayers for you.
          </Quote>
          <Quote author="Vivek Golla">
            I owe a lot to ZNotes. My friends and I would often pore over our
            textbooks in hopes of learning months&apos; worth of curriculum in a
            few days during our IGCSE curriculum, often being frustrated at the
            lack of organization and unimportant material within them.
            Thankfully we discovered ZNotes before our exams, which helped us
            gain access to tons of material on our subjects organized in a clean
            and easy to read manner. We saved lots of time by using the notes
            from the website, which enabled us to study more efficiently. I was
            able to attain 5 * on my IGCSE final exams, setting me up for
            success during my IB and college years now, where I&apos;m pursuing
            a degree in Mechanical Engineering in the USA.”
          </Quote>
          <Quote author="Adnan Khan">
            Hi! I&apos;ve been using ZNotes for the past 2 years now and wish
            that I could discover it before! The notes are crisp and concise
            with all the important information filtered out for you to revise.
            This is the just perfect revision and I would like to appreciate the
            founder, Mr. Zubair, who has wholeheartedly dedicated his time to
            really sculpt this learning hub.
          </Quote>
        </Slider>
        <FlexBox align justify>
          <IconButton className="page_testimonial-nav-button" onClick={onPrev}>
            <ChevronLeft />
          </IconButton>
          <IconButton className="page_testimonial-nav-button" onClick={onNext}>
            <ChevronRight />
          </IconButton>
        </FlexBox>
      </div>
    </FlexBox>
  );
};

Testimonials.propTypes = {
  progress: PropTypes.number.isRequired
};

export default Testimonials;
