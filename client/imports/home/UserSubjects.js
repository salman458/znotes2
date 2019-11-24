import React, { useReducer, createContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflowX: 'scroll',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    top: '30%',
    height: '50%',

  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    height: '100%',
    color: theme.palette.primary.light,
  },
  titleBar: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

function SingleLineGridList() {
  const classes = useStyles();

  return (

    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        <GridListTile key="someKey">
          <p>
I've always been that kind of student who despised theory parts of a subject and loved 'to
                        the point' explanations. And therefore course books were never a big help. Plus writing long
                        notes was also a big struggle. But ever since I found ZNotes, I've never felt any more
                        relieved about the upcoming exams. It's like a bundle of only important and necessary
                        concepts packed together in a PDF form. I even managed to get A* in Chemistry and A in
                        Physics IGCSE exams.I'd highly recommend them to students who are stressed about the
                        upcoming exams or even a simple school test. ZNotes are highly reliable!
            {' '}
          </p>
                    \
          {' '}
          <GridListTileBar
            title="Adeen Atif"
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            actionIcon={(
              <IconButton aria-label="star">
                <StarBorderIcon className={classes.title} />
              </IconButton>
                      )}
          />
        </GridListTile>

        <GridListTile key="someKe1">
          <p>
Thank you very much to the people who made such notes. May God increase your knowledge and
                        keep showering His blessings on you guys. Lots of love.
            {' '}
          </p>
          <GridListTileBar
            title="Ravindu Edirisinghe"
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            actionIcon={(
              <IconButton aria-label="star">
                <StarBorderIcon className={classes.title} />
              </IconButton>
                          )}
          />
        </GridListTile>

        <GridListTile key="someKe1">
          <p>
I hope to see A2 notes for Computer Science soon and can’t wait for this site to be more
                        well-recognized and appreciated. I have already spread word of this site to NYC classmates
                        and on their behalf I would like to thank you again, so thank you very much and keep up the
                        great work!
            {' '}
          </p>
          <GridListTileBar
            title="Mushfiq"
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            actionIcon={(
              <IconButton aria-label="star">
                <StarBorderIcon className={classes.title} />
              </IconButton>
                          )}
          />
        </GridListTile>

        <GridListTile key="someKe1">
          <p>
I found myself in a time of darkness, completely lost and devastated from my upcoming exams
                        (my own fault as instead of revision I’ve been playing Skyrim and bingeing Netflix) but you
                        sir, are a man of culture and have saved me from certain doom. I would just like to
                        congratulate you on all the good you’ve done for humanity and I believe many others will
                        agree with me. What you have done for humanity is unheard of and you deserve a knighthood.
                        Whenever I believe that humans have strayed too far from God, I think of the creator of
                        ZNotes and my heart is at peace. Thank you for being a legend.
            {' '}
          </p>
          <GridListTileBar
            title="Christine"
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            actionIcon={(
              <IconButton aria-label="star">
                <StarBorderIcon className={classes.title} />
              </IconButton>
                          )}
          />
        </GridListTile>

        <GridListTile key="someKe1">
          <p>
Asalam Alaikom brother. Thank you so much for sharing these notes with others. I’m very
                        grateful for your help. Wish there’ll be more good people like. Stay safe!
            {' '}
          </p>
          <GridListTileBar
            title="Anonymous"
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            actionIcon={(
              <IconButton aria-label="star">
                <StarBorderIcon className={classes.title} />
              </IconButton>
                          )}
          />
        </GridListTile>

        <GridListTile key="someKe1">
          <p>
yo yo yo guys.... One would truly and genuinely appreciate thine notes being thrust onto the
                        infinite and tragic medium that is the internet! One would receive much better International
                        General Certificate of Secondary Education Business Studies grades as a result and therefore
                        have a brighter and more fulfilling future in the overwhelming world of humanity. Thank you
                        eternally in advance!
            {' '}
          </p>
          <GridListTileBar
            title="Toby A"
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            actionIcon={(
              <IconButton aria-label="star">
                <StarBorderIcon className={classes.title} />
              </IconButton>
                          )}
          />
        </GridListTile>

        <GridListTile key="someKe1">
          <p>
These notes are absolutely amazing and have motivated me towards getting A*s in my A level.
                        Your guidelines are also very helpful. Lots of prayers for you.
            {' '}
          </p>
          <GridListTileBar
            title="Anonymous"
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            actionIcon={(
              <IconButton aria-label="star">
                <StarBorderIcon className={classes.title} />
              </IconButton>
                          )}
          />
        </GridListTile>

        <GridListTile key="someKe1">
          <p>
I owe a lot to ZNotes. My friends and I would often pore over our textbooks in hopes of
                        learning months' worth of curriculum in a few days during our IGCSE curriculum, often being
                        frustrated at the lack of organization and unimportant material within them. Thankfully we
                        discovered ZNotes before our exams, which helped us gain access to tons of material on our
                        subjects organized in a clean and easy to read manner. We saved lots of time by using the
                        notes from the website, which enabled us to study more efficiently. I was able to attain 5
                        A* on my IGCSE final exams, setting me up for success during my IB and college years now,
                        where I'm pursuing a degree in Mechanical Engineering in the USA.”
            {' '}
          </p>
          <GridListTileBar
            title="Vivek Golla"
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            actionIcon={(
              <IconButton aria-label="star">
                <StarBorderIcon className={classes.title} />
              </IconButton>
                          )}
          />
        </GridListTile>

        <GridListTile key="someKe1">
          <p>
Hi! I've been using ZNotes for the past 2 years now and wish that I could discover it before!
                        The notes are crisp and concise with all the important information filtered out for you to
                        revise. This is the just perfect revision and I would like to appreciate the founder, Mr.
                        Zubair, who has wholeheartedly dedicated his time to really sculpt this learning hub.
            {' '}
          </p>
          <GridListTileBar
            title="Adnan Khan"
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            actionIcon={(
              <IconButton aria-label="star">
                <StarBorderIcon className={classes.title} />
              </IconButton>
                          )}
          />
        </GridListTile>

      </GridList>
    </div>
  );
}

const Store = createContext(SingleLineGridList());

export { Store };
