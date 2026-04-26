import styled from "styled-components";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import IMAGES from "../images/images";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
  

const HomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: 64px;
    overflow: hidden;
    padding: 44px 20px 10px 20px;

    @media (min-width: 1440px) {
        width: 100%;
    }
`;


const ContentContainer = styled.div`
    display: flex;
    width: 220px;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    margin: 0 auto;
    
    @media (min-width: 1440px) {
        width: 100%;
    }
`;

const LogoMark = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    @media (min-width: 1440px) {
        img {
            width: 200px;
        }
    }
`;

const SubHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    align-self: stretch;

    h3 {
        align-self: stretch;
        text-align: center;
        font-size: 32px;
        font-style: normal;
        font-weight: 600;
        line-height: 32px; /* 100% */
        letter-spacing: -1.2px;
    }

    @media (min-width: 1440px) {
        h3 {
            align-self: stretch;
            text-align: center;
            font-size: 48px;
            font-style: normal;
            font-weight: 600;
            line-height: 48px; /* 100% */
            letter-spacing: -1.2px;
        }
    }
`;

const CtaWrapper = styled.div`
    display: flex;
    width: 177px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;

    p {
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: gray;

        a {
            color: #1D8CEE;
        }
    }
`;


const CarouselWrapper = styled.div`
    width: 100%;
`;


const Home = () => {


  return (
    <HomeWrapper>
      <ContentContainer>
        <LogoMark>
            {/* <img src={IMAGES.talkam_logo} alt="Talk'am Logo" width="45.852px" /> */}
            <img src={IMAGES.wordmark} alt="Talk'am" width="107.909px" />
        </LogoMark>
        <SubHeader>
            <h3>No fear, talk'am as e be</h3>
            <CtaWrapper>
                <Link to="/signup"><Button className='px-12 text-base'>Sign Up</Button></Link>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </CtaWrapper>
        </SubHeader>    
      </ContentContainer>
      <CarouselWrapper>

        <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
        >
            <SwiperSlide>
                <img src={IMAGES.vibrant_girl} alt="A picture of a girl" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={IMAGES.masqurade} alt="A maqurade picture" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={IMAGES.solo_boy} alt="A picture of a moody girl" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={IMAGES.moody_boy} alt="A picture of a boy" />
            </SwiperSlide>
        </Swiper>

      </CarouselWrapper>
    </HomeWrapper>
  );
};

export default Home;
