import React from 'react';
import { Col, Row, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { dateNumber, month, year } from "../../common/const";
import "./Booking.css";

let autocomplete;
let google = window.google;
const componentForm = {
    street_number: "short_name",
    route: "long_name",
    locality: "long_name",
    administrative_area_level_1: "short_name",
    country: "long_name",
    postal_code: "short_name",
    postal_town: "long_name"
  };
class Booking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: [],
            passengerArray: [{
                fname: '',
                lname: '',
                date: '',
                month: '',
                year: '',
                gender:''
            }],
            address: {
                streetAddress: '',
                city: '',
                county: '',
                postcode: '',
                country: ''
            },
            packageName: 'Bali Package',
            price: '150'
        }
        let yearArray = [].concat(year);
        for (let i=2020; i>=1990; i--) {
            yearArray.push(i);
        }
        this.state.year = yearArray;
        
        
    }

    onAddPaseenger = () => {
        let passengerArray = [].concat(this.state.passengerArray);
        passengerArray.push({
            fname: '',
            lname: '',
            date: '',
            month: '',
            year: '',
            gender:''
        })

        this.setState({
            passengerArray,
        })
    }

    onRemovePaseenger = (id) => {
        let passengerArray = [].concat(this.state.passengerArray);
        passengerArray.splice(id, 1);

        this.setState({
            passengerArray,
        })
    }

    renderDate = (dateData , key) => {
        return(
            dateData.map((d, i) => <option key={d + key} value={d}>{d}</option>)
        )
    }

    onPassengerDetailChange = (e, index, fieldName) => {
        let passengerArray = [].concat(this.state.passengerArray);
        passengerArray[index][fieldName] = e.target.value;
        this.setState({
            passengerArray,
        })
    }

    onInputChange = (e, field) => {
        this.setState({
            [field]: e.target.value,
        })
    }

    onAddressChange = (e,field) => {
        this.setState({
            address: {
                ...this.state.address,
                [field]: e.target.value,
            }
            
        })
    }

    renderPassengerDetail = (id, fromArray = false,) => {
        const {year} = this.state;
        return(
            <React.Fragment>
                <FormGroup>
                    <Input type="text" name="fname" id="firstName" placeholder="First name"
                     onChange={(e) => this.onPassengerDetailChange(e, id, 'fname')}/>
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="lname" id="lastName" placeholder="Last name"
                    onChange={(e) => this.onPassengerDetailChange(e, id, 'lname')} />
                </FormGroup>
                <FormGroup className="ml-2">
                    <Label for="dob">Date of birth:</Label>
                    <Row>
                        <Col xs="3">
                            <Input type="select" name="date" id="date"
                             onChange={(e) => this.onPassengerDetailChange(e, id, 'date')}>
                                {this.renderDate(dateNumber, "date")}
                            </Input>
                        </Col>
                        <Col xs="4">
                            <Input type="select" name="month" id="month"
                            onChange={(e) => this.onPassengerDetailChange(e, id, 'month')}>
                                {this.renderDate(month, "month")}
                            </Input>
                        </Col>
                        <Col xs="4">
                            <Input type="select" name="year" id="year"
                            onChange={(e) => this.onPassengerDetailChange(e, id, 'year')}>
                                {this.renderDate(year, "year")}
                            </Input>
                        </Col>
                    </Row>                            
                </FormGroup>
                <FormGroup className="d-flex">
                    <Label>Gender:</Label>
                    <FormGroup check inline className="ml-3">
                        <Label check>
                            <Input type="radio" value="male" name="radio1" onChange={(e) => this.onPassengerDetailChange(e, id, 'gender')}/>
                            Male
                        </Label>
                    </FormGroup>
                    <FormGroup check inline>
                    <Label check>
                        <Input type="radio" value="female" name="radio1" onChange={(e) => this.onPassengerDetailChange(e, id, 'gender')}/>
                        Female
                    </Label>
                    </FormGroup>
                    <FormGroup check inline>
                    <Label check>
                        <Input type="radio" value="other" name="radio1" onChange={(e) => this.onPassengerDetailChange(e, id, 'gender')}/>
                        Other
                    </Label>
                    </FormGroup>                   
                </FormGroup>
                {fromArray &&
                    <Button outline className="passengerBtn mb-2" onClick={() => this.onRemovePaseenger(id)}>
                        <div className="row mx-auto">
                        <p className="my-auto">Remove</p></div>
                    </Button>
                }
            </React.Fragment>
        )
    }

    getpassengerDetails = (field) => {
        const {passengerArray} = this.state;
        const data = passengerArray.map((passenger) => {
            return passenger[field]
        })
    
        return data;
    }

    getDOBs = () => {
        const {passengerArray} = this.state;
        const data = passengerArray.map((passenger) => {
            return passenger.date + "/" + passenger.month + "/" + passenger.year;
        })
        return data;
    }

    getAges = () => {
        const {startDate, passengerArray} = this.state;
        const dob = this.getDOBs();
        var splitSD = startDate.split("-");
        let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthName = parseInt(splitSD[1]);
        var sd = monthNames[monthName] + "/" + splitSD[0] + "/" + splitSD[2];
        
        var sdAsDate = new Date(sd);

        const ages = passengerArray.map((passenger, i) => {
            let dobCurrent = dob[i];
            let splitDOB = dobCurrent.split("/");
            let dobFirst = splitDOB[1] + "/" + splitDOB[0] + "/" + splitDOB[2];
            let dobAsDate = new Date(dobFirst); 
            let diff_ms = sdAsDate.getTime() - dobAsDate.getTime();

            let age_dt = new Date(diff_ms);
            return Math.abs(age_dt.getUTCFullYear() - 1970);
        })
        return ages;
      }

      getAddress = () => {
          const {streetAddress, city, county, postcode, country} = this.state.address;
          return streetAddress + city + county + postcode + country;
    }

    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    getFormData = () => {
        const {email, phoneNumber, startDate, customisations, passengerArray} = this.state;
        if(!startDate) {
            alert("You have not filled in some details")
            return
        }

        if (!this.validateEmail(email)) {
            alert("The email you have entered is invalid");
            return;
        }

        var passengers = {
            firstNames: this.getpassengerDetails("fname"),
            lastNames:  this.getpassengerDetails("lname"),
            datesOfBirth: this.getDOBs(),
            genders: this.getpassengerDetails("gender"),
            ages: this.getAges(),
            email,
            phoneNumber,
            startDate,
            customisations,
            address: this.getAddress()
        };

        if (this.checkValidation(passengers, passengerArray.length)) {
            this.writeToFiles(passengers, passengerArray.length);
        } else {
            alert("You have not filled in some details")
            return
        }
    }

    writeToFiles = (passengers, noPassengers) => {
        this.writePassengerFile(passengers.firstNames, passengers.lastNames, passengers.datesOfBirth, passengers.genders, passengers.ages);
        this.writeLeadPassengerFile(passengers.firstNames[0], passengers.lastNames[0], passengers.datesOfBirth[0], passengers.genders[0], passengers.ages[0], passengers.email, passengers.phoneNumber, passengers.address, passengers.startDate, passengers.customisations);
    }

    writePassengerFile = (firstName, lastName, dob, gender, age) => {
        var details = {
          "firstName": firstName,
          "lastName": lastName,
          "dob": dob,
          "gender": gender,
          "ages": age
        };
        const data = JSON.stringify(details);
        let filename = 'passengerDetails.json';
    
        localStorage.setItem("passengerDetails", JSON.stringify(details));
        let blob = new Blob([data], {type: 'text/json'}),
            e = document.createEvent('MouseEvents'),
            a = document.createElement('a');

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0 , 0, 0,0,0, false, false, false, false, 0, null)
        a.dispatchEvent(e);
      }
      
      writeLeadPassengerFile = (firstName, lastName, dob, gender, age, email, phoneNum, address, startDate, customisations) => {
        let leadPassengerDetails = {
          "firstName": firstName,
          "lastName": lastName,
          "dob": dob,
          "gender": gender,
          "age": age,
          "email": email,
          "phoneNum": phoneNum,
          "address": address,
          "startDate": startDate,
          "customisations": customisations
        };

        const data = JSON.stringify(leadPassengerDetails);
        let filename = 'leadPassengerDetails.json';

        let blob = new Blob([data], {type: 'text/json'}),
            e = document.createEvent('MouseEvents'),
            a = document.createElement('a');

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0 , 0, 0,0,0, false, false, false, false, 0, null)
        a.dispatchEvent(e);
      
        //var obj = JSON.parse(leadPassengerDetails);
        localStorage.setItem("leadPassenger", JSON.stringify(leadPassengerDetails))
      }

    checkValidation = (passengers, noPassengers) => {
        if (passengers.email === "" || passengers.phoneNumber === "" || passengers.address === "" || passengers.startDate === "") {
            return false;
          }
        
          for (var i=0; i<noPassengers; i++) {
            if (passengers.firstNames[i] === "" || passengers.lastNames[i] === "" || passengers.datesOfBirth[i] === "" || passengers.genders[i] === "") {
              return false;
            }
          }
          return true;
    }

    geolocate = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            const geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            const circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
          });
        }
    }

    fillInAddress = () => {
        const place = autocomplete.getPlace();

        for (const component of place.address_components) {
            const addressType = component.types[0];

            if (componentForm[addressType]) {
            const val = component[componentForm[addressType]];
            document.getElementById(addressType).value = val;
            }
        }
        var strNum = document.getElementById("street_number").value;
        var routeVal = document.getElementById("route").value;
        var newRouteVal = strNum.concat(" ", routeVal);
        document.getElementById("route").value = newRouteVal;
    }

    render() {
        const {passengerArray} = this.state;
        return <Row className="mt-3">
            <Col md="4" className="container mr-5 pr-5">
                <div>
                    <h4>Your Details</h4>
                    <Form>
                        {this.renderPassengerDetail(0)}
                        <FormGroup>
                            <Input
                             type="email"
                             name="email"
                             id="email"
                             placeholder="E-mail(booking info will be sent to this address)" 
                            onChange={(e) => this.onInputChange(e, 'email')}
                             />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" name="pnumber" id="pnumber" placeholder="Phone number"
                            onChange={(e) => this.onInputChange(e, 'phoneNumber')} />
                        </FormGroup>
                    </Form>
                </div>
                <div className="mt-3">
                    <p><strong>Address</strong></p>
                    <Form>
                        <FormGroup>
                            <Input type="text" name="address" id="address" placeholder="Enter your address" onFocus={this.geolocate}  />
                        </FormGroup>
                        <FormGroup>
                            <input type="text" id="street_number" hidden="true"></input>
                            <Input type="text" name="streetAddress" id="route" placeholder="Street address"
                            onChange={(e) => this.onAddressChange(e, 'streetAddress')} />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" name="city" id="postal_town" placeholder="City or Town"
                            onChange={(e) => this.onAddressChange(e, 'city')} />
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="6">
                                    <Input type="text" name="county" id="administrative_area_level_1" placeholder="County"
                                    onChange={(e) => this.onAddressChange(e, 'county')} />
                                </Col>
                                <Col xs="6">
                                    <Input type="text" name="pCode" id="postal_code" placeholder="Post code"
                                    onChange={(e) => this.onAddressChange(e, 'postCode')} />
                                </Col>
                            </Row>     
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" name="country" id="country" placeholder="Country"
                            onChange={(e) => this.onAddressChange(e, 'country')} />
                        </FormGroup>
                        <Button outline className="passengerBtn" onClick={this.onAddPaseenger}>
                            <div className="row mx-auto">
                            <i className="material-icons addIcon">
                            add_circle_outline</i>
                            <p className="my-auto">&nbsp; Add another passenger</p></div>
                        </Button>
                        <div className="pt-3">
                        {passengerArray.map((passenger, id) => {
                            if(id > 0) {
                                return this.renderPassengerDetail(id, true)
                            }                          
                        })}
                        </div>
                        
                    </Form>
                </div>
            </Col>
            <Col md="6" className="container mr-5 pr-5">
                <Col md="12" className="container">
                    <p>Booking</p>
                    <h3 id="packageTitle"><strong>{this.state.packageName}</strong></h3>
                </Col>
                <Col md="12" className="container">
                    <p>Pick a <strong>start date</strong></p>
                    <input type="date" id="startDate" name="date" placeholder="" onChange={(e) => this.onInputChange(e, 'startDate')}/>
                </Col>
                <Col md="6" className="">
                    <h3>Customisations: </h3>
                    <Input type="textarea" name="text" id="customisations" rows="10" onChange={(e) => this.onInputChange(e, 'customisations')}
                    placeholder="Here you can request to change your adventure around. You could ask to drop some activities, extend the dates at a certain accomodation etc."/>           
                </Col>
                <Col md="6">
                    <label for="bookingRequest">Approximate Price per Person: {this.state.price} </label>
                    <Button className="btn btn-primary" id="bookingRequest" name="bookingRequest" onClick={this.getFormData} type="submit">
                        <div className="row mx-auto">
                        <i className="material-icons addIcon">work</i>
                        <p className="my-auto">&nbsp; Request Booking</p></div></Button>
                </Col>          
            </Col>
        </Row>
      }

      componentDidMount() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCPJpjD-qcR_yIxJnS8maR5W9KB0E3EzYI&callback=initAutocomplete&libraries=places&v=weekly"; // site that doesn’t send Access-Control-*
        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.json())
        .then(contents => {
            autocomplete.addListener("place_changed", this.fillInAddress);
            console.log(contents)})
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
      }
}

export default Booking;
