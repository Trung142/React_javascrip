import Carousel from 'react-bootstrap/Carousel';
import Pagination from 'react-bootstrap/Pagination';
import img from '../assets/images/Hinh 3.jpg';
import img1 from '../assets/images/Hinh 2.jpg';
import img2 from '../assets/images/Hinh 1.jpg';
import img3 from '../assets/images/Hinh 5.jpg';
const Home = () => {

    let active = document.querySelector("active");
    let items = [];
    for (let number = 1; number <= 3; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }
    return (
        <>
            <Carousel className='img'>
                <Carousel.Item >
                    <img
                        className="d-block w-100"
                        src={img}
                        alt="First slide"
                    />
                    <Carousel.Caption className='text-body'>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item >
                    <img
                        className="d-block w-100 rounded-3 "
                        src={img1}
                        alt="Second slide"
                    />

                    <Carousel.Caption className='text-body'>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item >
                    <img
                        className="d-block w-100 rounded-3"
                        src={img2}
                        alt="Third slide"
                    />
                    <Carousel.Caption className='text-body'>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item >
                    <img
                        className="d-block w-100 rounded-3"
                        src={img3}
                        alt="Forsd slide"
                    />

                    <Carousel.Caption className='text-body'>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div>
                <Pagination>{items}</Pagination>
            </div>
        </>
    )
}
export default Home;