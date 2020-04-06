import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Switch from 'react-switch';
import "./styles.scss";

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      num: '',
      checked: false,
      contributor:true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    Meteor.call('getTeam', {}, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          users: res.filter((user) => user.emails !== undefined),
        });
        this.setState({ num: res.length });
      }
    });
  }

  FormRow() {
    const gridlist = [];
    this.state.users.filter((user) => {
      if (this.state.checked) {
        if (user.subjects.length > 0) return user;
      } else if (user.role == 'team') return user;
    }).forEach((user) => {
      gridlist.push(
        <Grid item xs={4}>
          <div className="container69">
            <p className="subject">{user.username}</p>
          </div>
        </Grid>,
      );
    });
    return (
      <>
        {gridlist}
      </>
    );
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  renderButtons = ()=>{
    return (
      <div className="r-buttons" onClick={()=>{this.setState({contributor: !this.state.contributor})}}>
      <a href="#" className="c-button aos-init active aos-animate" data-aos="zoom-in" data-aos-easing="ease-out" data-aos-delay="300">Contributors</a>
      <a href="#" className="m-button aos-init aos-animate" data-aos="zoom-in" data-aos-easing="ease-out" data-aos-delay="600">Management</a>
  </div>
    )
  }

  renderContributorTeam = ()=>{
    return (
      <div className="contributors aos-init" data-aos="zoom-in" data-aos-easing="ease-out" data-aos-delay="600" data-aos-duration="500">
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/zubair.jpg?alt=media&amp;token=a9614478-3161-4a42-bcc1-82c09e3cdfee"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Zubair Junjunia</div>
                        <div className="r-title">Founding Contributor</div>
                        <div className="r-desc">Studying Mathematics at University College London, educationalist, long
                            distance runner, figure &amp; inline skater, avid reader and amateur graphics designer.</div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/saif.jpg?alt=media&amp;token=ed199463-e9ae-4a6c-a91b-f335a1421ab5"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Saif Asmi</div>
                        <div className="r-title">Founding Contributor</div>
                        <div className="r-desc">Studying Chemical Engineering at McGill University, collector of dank
                            memes, likes potatoes, hybrid engine enthusiast with a love for hardcore gaming.</div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/emir.jpeg?alt=media&amp;token=3bf79882-f5a0-4d88-8eeb-fd7a6b81df76"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Emir Demirhan</div>
                        <div className="r-title">Founding Contributor</div>
                        <div className="r-desc">Studying Electronic &amp; Electrical Engineering at University College,
                            footballer, volleyballer, rugby-player, basketballer, cricketer, all-round sports fanatic
                            and extreme adrenaline junky.</div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/abhijit.jpg?alt=media&amp;token=39e5e5e3-20ed-48b0-aca5-671112bc9ac0"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Abhijit Vempati</div>
                        <div className="r-title">English Language</div>
                        <div className="r-desc">Year 12 at Reqelford International School, Hyderabad, India. Music lover.
                            Maniac Drummer. Basketball/NBA analyst. Aspiring Computer Scientist/Business guy. Ice cream
                            lover.</div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/anand.jpg?alt=media&amp;token=3a6d4929-515c-4f2f-8485-9c01ba05da05"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Anand Sankar 黒椿</div>
                        <div className="r-title">AS IT</div>
                        <div className="r-desc">Studying Computer Engineering at UMass Dartmouth. Artist. Robotics and
                            Comicbook enthusiast. Also likes to dramatically pose with oranges.</div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/rafay.jpg?alt=media&amp;token=af503523-1d42-4d87-84dc-8f17ec2f2803"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Rafay Mansoor</div>
                        <div className="r-title">AS Computer Science</div>
                        <div className="r-desc">Studying Computer Science at the University of Toronto, tech enthusiast,
                            self-taught programmer and music lover.</div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/alisha.jpg?alt=media&amp;token=8cd7f58c-e7d9-46f5-8090-ddea94929506"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Alisha Saiyed</div>
                        <div className="r-title">AS Computer Science</div>
                        <div className="r-desc">Computer Science and Maths Tutor, studying at Northern Virginia Community
                            College, social and growth hacker, front-end developer, shameless dancer, and comedy lover.
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/haris.jpeg?alt=media&amp;token=540b785d-f382-4194-99a3-af9ea4df64fe"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Haris Ali</div>
                        <div className="r-title">IGCSE Physics</div>
                        <div className="r-desc">Former A Level student at Jeddah Prep and Grammar School, avid guitarist,
                            proud Lahori, interested in medicine and computer science.</div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/pragya.jpg?alt=media&amp;token=a85f6c4b-d951-48e9-bc8e-2c8dcfe766c9"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Pragya Chawla</div>
                        <div className="r-title">IGCSE History</div>
                        <div className="r-desc">Freshman at Stanford University studying Computer Science and International
                            Relations. Like poetry, social commentary and coffee.
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/maheer.jpg?alt=media&amp;token=88d68338-db35-483d-88f4-cfdcaeb9110d"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Maheer Tanzim Khan</div>
                        <div className="r-title">A2 Biology, Economics &amp; SAT Physics</div>
                        <div className="r-desc">Double majoring in electrical and mechanical engineering at The Ohio State
                            University, sprinter, cricketer, anime and Bollywood fan, good cook, crazy driver, fitness
                            freak, etc.
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/mahdi.jpg?alt=media&amp;token=2665ee49-355f-47ee-8920-eccea94647a8"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Mahdi Khandaker</div>
                        <div className="r-title">A2 Biology &amp; Economics</div>
                        <div className="r-desc">Studying Computer Science at University of Waterloo. An avid reader and a
                            humble, honest, benevolent person. Tech head would be the ideal adjective to describe me.
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/zulker.jpg?alt=media&amp;token=aa3aab2c-0299-4fa5-b18e-4c6a847fc504"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Zulker Nayeen Nahiyan</div>
                        <div className="r-title">A2 Economics &amp; SAT Physics</div>
                        <div className="r-desc">Future computer science student, avid programmer, cyclist, cake baker,
                            amateur guitarist, video gamer, etc.
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/xiaoyu.jpg?alt=media&amp;token=bfb1e15e-2f65-4274-8b7e-bb37daafe60b"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Xiaoyu Chen</div>
                        <div className="r-title">AS Business</div>
                        <div className="r-desc">NYU '22, learning A-level Physics, CS and Business, part-time model,
                            make-up enthusiast, and vlogger; recently working on college applications and SAT prep.
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/maimoona.jpg?alt=media&amp;token=b53ccaf0-efc3-485f-8e72-0fea7de5e96b"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Maimoona Junjunia</div>
                        <div className="r-title">IGCSE Computer Science</div>
                        <div className="r-desc">Studying A Levels at Jeddah Prep and Grammar School, organization fanatic,
                            baking enthusiast, Harry Potter fan, interested in business and product design.
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/adarsh.jpg?alt=media&amp;token=e6f613af-2a06-4c14-8c64-f7244569ee0f"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Adarsh SR Nalamalapu</div>
                        <div className="r-title">IGCSE Computer Science</div>
                        <div className="r-desc">Studying A Levels at CLC (Cambridge Leadership College). Don't know about
                            the rest of myself, still trying to figure that out!
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/joao.jpg?alt=media&amp;token=b69ca7dd-ecb9-4ed5-aa20-3e783c3967ae"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">João Pereira</div>
                        <div className="r-title">IG Biology</div>
                        <div className="r-desc">Studying IGCSEs in Bratislava, Slovakia, has lived in 7 different
                            countries, 100 &amp; 200m sprinter, football player and computer geek.
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/akshya.jpg?alt=media&amp;token=8a4d8765-2cdf-4ff9-8f1d-a3124e1e2ac2"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Akshya SP</div>
                        <div className="r-title">IG ICT</div>
                        <div className="r-desc">Doing my A Levels at The Indian Public School, Erode, India. Media aspirant.
                            Photographer by passion. Movie buff.
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/krish.jpg?alt=media&amp;token=539149ed-1ff7-4eb2-84dc-d6e59459bded"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Krish Theobald</div>
                        <div className="r-title">IG Accounting</div>
                        <div className="r-desc">Vegan for life, Break-fixer, Rubix cuber, Love Minecraft and Home Design.
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/pugaz.jpg?alt=media&amp;token=e760c77b-cbdc-45fd-9b74-6330bca01cd7"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Pugazharasu</div>
                        <div className="r-title">A2 Computer Science</div>
                        <div className="r-desc">Studying Physics at Loyola college, Chennai, musician, coder, web designer,
                            avid reader, personal development enthusiast, movie &amp; comic book lover.
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/karthik.jpg?alt=media&amp;token=3bb2080d-926d-4e6b-a2b4-b856cc1a853d"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Karthikeyan Arumugam</div>
                        <div className="r-title">A2 Computer Science</div>
                        <div className="r-desc">Studying Computer Science at the University of Leeds. Self-taught full stack
                            developer, avid reader, petrolhead, foodie.
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/ishika.jpeg?alt=media&amp;token=93d8e1ca-02eb-4030-865c-b0f6e26a44fe"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Ishika Jain</div>
                        <div className="r-title">AS Psychology</div>
                        <div className="r-desc">Passionate, loving, multilingual, TV show fan. I enjoy travelling &amp; eating
                            good food (yes, I’m a big foodie)! Graduating from ABWA class of 2019, A Levels soon!!
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/prisha.jpg?alt=media&amp;token=94a5d536-a9f2-403c-bc0e-5b5e4e7c2d31"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Prisha Dani</div>
                        <div className="r-title">AS Psychology</div>
                        <div className="r-desc"> Extrovert, dancer, occasional photographer and avid reader. Enjoys the
                            outdoors, traveling &amp; meeting new people!Soon graduating from ABWA class of 2019, A Levels.
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/aliya.jpg?alt=media&amp;token=d6c5ca5c-a492-4fa3-8603-1a6232444825"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Sheikha Aliya Ali</div>
                        <div className="r-title">IG Environmental Management</div>
                        <div className="r-desc"> Studying A levels at Arab Unity School - avid reader, TV series &amp; film
                            enthusiast, blogger, dedicated volunteer, MUNer, zealous learner; a compassionate, diligent
                            &amp; altruistic lass.
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/niketana.jpg?alt=media&amp;token=33820f64-ebb4-4eb9-a8a6-7496a6d97617"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Niketana Reddy</div>
                        <div className="r-title">IG Environmental Management</div>
                        <div className="r-desc">Love Science. Passionate. A melophile. A dance fanatic.
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/abdul.png?alt=media&amp;token=b717937e-3bc2-4629-852e-8309037b8756"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Abdul Majeed</div>
                        <div className="r-title">IG ICT Practicals</div>
                        <div className="r-desc">Studying AS/A levels at APL Global School, Chennai. Muslim for life. Tech
                            lover, humble, honest, and calm. Mediocre footballer and loves exploring new things.</div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/aishwarya.png?alt=media&amp;token=f6a5624d-acd4-4319-9e10-677f230cce2e"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Aishwarya Girish Kumar</div>
                        <div className="r-title">IG ICT Practicals</div>
                        <div className="r-desc">Doing A levels at NIS, Saudi Arabia, self-accepted nerd, aspiring to study
                            astrophysics (or something else space-y). Enjoy being around people :)</div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/tanushka.jpeg?alt=media&amp;token=b315afa7-3054-41d3-9d4a-d4712525f69c"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Tanushka Shankar</div>
                        <div className="r-title">IG History</div>
                        <div className="r-desc">Studying A-Levels at chs. Love 'The Office' (Micheal Scott is my spirit animal). mediocre pianist and ardent environmentalist :smiley:</div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/disha.png?alt=media&amp;token=a14420c5-0e88-405a-8c1a-edf721e87402"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Disha Garg</div>
                        <div className="r-title">IG ICT Practicals</div>
                        <div className="r-desc">Average teenage girl, loves travelling, taking AS levels , plays the drums (
                            or at least tries to), trying to figure out my non-existent life one day at a time
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/sarah.jpg?alt=media&amp;token=995b6234-9073-4f90-87ff-812660cb95e9"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Sarah Bassiouny</div>
                        <div className="r-title">IG ICT Practicals</div>
                        <div className="r-desc">Inspired to study ophthalmology, prefer teamwork and can’t survive without
                            maths. A fan of action movies and a big coffee addict!
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/anonymous_male.jpg?alt=media&amp;token=0453d717-6771-4f3c-91e0-f844230ebca5"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Omer Mukhtar</div>
                        <div className="r-title">IG Arabic</div>
                        <div className="r-desc">Studying NIOS at Peace Academy, Chennai. Muslim for life. Avid reader,
                            hard-core cricketer and foodie. Adores cats and other pets and loves riding bikes.
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/devandhira.jpg?alt=media&amp;token=3d90545d-b7ed-4d1a-b5b3-ab73de715f1d"/> 
                       </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Devandhira Wijaya Wangsa</div>
                        <div className="r-title">IG Mandarin</div>
                        <div className="r-desc">Studying A levels Math, Physics, Chemistry, Further maths. Mathematician.
                            Student. Teacher. Likes computers and games. Dream of getting the Fields Medal.
                        </div>
                    </div>
                </div>

            </div>
   
    )
  }

  renderManagementTeam =()=>{
    return(
      <div className="contributors aos-init" data-aos="zoom-in" data-aos-easing="ease-out" data-aos-delay="600" data-aos-duration="500">
             
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/zubair.jpg?alt=media&amp;token=a9614478-3161-4a42-bcc1-82c09e3cdfee"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Zubair Junjunia</div>
                        <div className="r-title">Founder &amp; CEO</div>
                        <div className="r-desc">Studying Mathematics at University College London, educationalist, long
                            distance runner, figure &amp; inline skater, avid reader and amateur graphics designer.
                        </div>
                        <br/>
                        <div className="social-ta">
                            <a href="https://www.linkedin.com/in/zjunjunia/">
                                <i className="fab fa-linkedin fa-3x" style={{color:"white"}} ></i></a>
                            <a href="mailto:zubair.junjunia@gmail.com">
                                <i className="fas fa-envelope fa-3x" style={{color:"white"}}  ></i></a>
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/adarsh.jpg?alt=media&amp;token=e6f613af-2a06-4c14-8c64-f7244569ee0f"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Adarsh SR Nalamalapu</div>
                        <div className="r-title">Team Lead</div>
                        <div className="r-desc">Studying A Levels at CLC (Cambridge Leadership College). Don't know about
                            the rest of myself, still trying to figure that out!
                        </div>
                        <br/>
                        <div className="social-ta">
                            <a href="www.linkedin.com/in/analamalapu">
                                <i className="fab fa-linkedin fa-3x" style={{color:"white"}}  ></i></a>
                            <a href="mailto:adarsh.nalamalapu@gmail.com">
                                <i className="fas fa-envelope fa-3x" style={{color:"white"}}  ></i></a>
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/anand.jpg?alt=media&amp;token=3a6d4929-515c-4f2f-8485-9c01ba05da05"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Anand Sankar 黒椿</div>
                        <div className="r-title">Design Lead</div>
                        <div className="r-desc">Studying Computer Engineering at UMass Dartmouth. Artist. Robotics and
                            Comicbook enthusiast. Also likes to dramatically pose with oranges.
                        </div>
                        <br/>
                        <div className="social-ta">
                            <a href="https://www.linkedin.com/in/notkuro/"><i className="fab fa-linkedin fa-3x" style={{color:"white"}}  ></i></a>
                            <a href="mailto:purrplelynx@gmail.com">
                                <i className="fas fa-envelope fa-3x" style={{color:"white"}}  ></i></a>
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/krish.jpg?alt=media&amp;token=539149ed-1ff7-4eb2-84dc-d6e59459bded"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Krish Theobald</div>
                        <div className="r-title">ZClass &amp; Content Manager</div>
                        <div className="r-desc">Vegan for life! Break-fixer, rubix-cuber. Love Minecraft and Home Design!
                        </div>
                        <br/>
                        <div className="social-ta">
                            <a href="https://www.linkedin.com/in/krish-theobald-37536616a/">
                                <i className="fab fa-linkedin fa-3x" style={{color:"white"}}  ></i></a>
                            <a href="mailto:krishtheobald@gmail.com">
                                <i className="fas fa-envelope fa-3x" style={{color:"white"}}  ></i></a>
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/karthik.jpg?alt=media&amp;token=3bb2080d-926d-4e6b-a2b4-b856cc1a853d"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Karthikeyan Arumugam</div>
                        <div className="r-title">Tech Lead</div>
                        <div className="r-desc">Studying Computer Science at the University of Leeds. Self-taught full stack
                            developer, avid reader, petrolhead, foodie.
                        </div>
                        <br/>
                        <div className="social-ta">
                            <a href="https://www.linkedin.com/in/karthikeyan-arumugam-2b6b13142/"><i className="fab fa-linkedin fa-3x" style={{color:"white"}}  ></i></a>
                            <a href="mailto:kamtechie@gmail.com">
                                <i className="fas fa-envelope fa-3x" style={{color:"white"}}  ></i></a>
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/alisha.jpg?alt=media&amp;token=8cd7f58c-e7d9-46f5-8090-ddea94929506"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Alisha Saiyed</div>
                        <div className="r-title">Social Media Manager</div>
                        <div className="r-desc">Computer Science and Maths Tutor, studying at Northern Virginia Community
                            College, social and growth hacker, front-end developer, shameless dancer, and comedy lover.
                        </div>
                        <br/>
                        <div className="social-ta">
                            <a href="https://www.linkedin.com/in/alishasaiyed/"><i className="fab fa-linkedin fa-3x" style={{color:"white"}}  ></i></a>
                            <a href="mailto:alishaproductions27@gmail.com">
                                <i className="fas fa-envelope fa-3x" style={{color:"white"}}  ></i></a>
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/pugaz.jpg?alt=media&amp;token=e760c77b-cbdc-45fd-9b74-6330bca01cd7"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Pugazharasu</div>
                        <div className="r-title">Content Developer</div>
                        <div className="r-desc">Studying Physics at Loyola college, Chennai, musician, coder, web designer,
                            avid reader, personal development enthusiast, movie &amp; comic book lover.
                        </div>
                        <br/>
                        <div className="social-ta">
                            <a href="https://www.linkedin.com/in/pugazh-a-418a87100/"><i className="fab fa-linkedin fa-3x" style={{color:"white"}}  ></i></a>
                            <a href="mailto:pugazhin202@gmail.com">
                                <i className="fas fa-envelope fa-3x" style={{color:"white"}}  ></i></a>
                        </div>
                    </div>
                </div>
                <div className="team-p">
                    <div className="profile-pic"><img src="https://firebasestorage.googleapis.com/v0/b/znotes-b36a6.appspot.com/o/simrah.jpg?alt=media&amp;token=c4482c18-cf27-4ebb-bcc3-06d91d110815"/>
                    </div>
                    <div className="info-p-wrap">
                        <div className="n-title">Simrah Palla</div>
                        <div className="r-title">Business Development Manager</div>
                        <div className="r-desc">Studying Business Management at Kings College London, social
                            entrepreneur, educationalist, passionate about food and travelling.
                        </div>
                        <br/>
                        <div className="social-ta">
                            <a href="https://www.linkedin.com/in/simrah-palla-9bba6a180/"><i className="fab fa-linkedin fa-3x" style={{color:"white"}}  ></i></a>
                            <a href="mailto:simrahpalla@gmail.com">
                                <i className="fas fa-envelope fa-3x" style={{color:"white"}}  ></i></a>
                        </div>
                    </div>
                </div>
           
        </div>
     
    )
  }

  renderTeams =()=>{
    return (
    <div className="team-container">
      <div className="team-wrap">
      {this.state.contributor ? this.renderContributorTeam():this.renderManagementTeam()}
   
  
 
  </div>
    </div>

    )
  }

  renderBody() {
    return (
      <div className="something">
 {this.renderButtons()}

        {/* <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            {this.FormRow()}
          </Grid>
        </Grid> */}
{this.renderTeams()}
      </div>
    );
  }

  render() {

 
    return (
      <div >
        {this.renderBody()}
      </div>
    );
  }
}

export default Team;
