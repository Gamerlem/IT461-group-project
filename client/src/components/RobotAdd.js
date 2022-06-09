import '../css/RobotAdd.css'
import Header from './Header';
import { Row, Col, Container, Form } from "react-bootstrap"
import { Link } from 'react-router-dom';

const RobotAdd = () => {
    
    return (
        <div>
            <Header />
            <Container fluid className="w-75 mt-3">
                <Row className='mb-3'>
                    <Col className="p-0" lg={12} md={12} sm={12}>
                        <Link to ="/">
                            <h1 className="back label">&lt;Back</h1>
                        </Link>
                    </Col>
                </Row>
                <Row className='mb-4'>
                    <Col className="p-0" lg={12} md={12} sm={12}>
                        <h1 className="label">Your Robot for Hire</h1>
                    </Col>
                </Row>
                <Form>
                    <Row className='border-gradient'>
                        <Col className="m-auto p-0" lg={5} md={5} sm={12}>
                            <div className='container'>
                                <span className='col'>
                                    <div className='img-container'>
                                        <Row>
                                            <Col lg={6} md={6} sm={6}>
                                                <p className='name-txt'><strong>RoboPrim</strong></p>
                                                <p className='date-txt'><strong>Sept 10</strong></p>
                                            </Col>
                                            <Col lg={6} md={6} sm={6}>
                                                <p className='id-txt'><strong>ID#231</strong></p>
                                            </Col>
                                        </Row>
                                        <img className='robot-img' src='https://robohash.org/1' alt=''/>
                                    </div>
                                </span>
                            </div>
                        </Col>
                        <Col className="m-auto text-white form-container" lg={7} md={7} sm={12}>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label className='text-left p-0'>Name</Form.Label>
                                <Form.Control type="text" name='name'/>
                            </Form.Group>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label className='text-left p-0'>Capabilities</Form.Label>
                                <Form.Control as="textarea" rows={3} name='capabilities'/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col lg={12} md={12} sm={12} className="text-right p-0" >
                            <button className="bn37">
                                <span className="btn-text">Create Robot</span>
                            </button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    )
}

export default RobotAdd;