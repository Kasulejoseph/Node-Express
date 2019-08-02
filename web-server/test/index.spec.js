import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

// Configure chai
chai.use(chaiHttp);
chai.should();
describe("index test", () => {
    describe("Endpoints", () => {
        it("should get athe index weather details", (done) => {            
            chai.request(app)
                .get('/weather')
                .end((err, res) => {                    
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                 });
        });
    })
})