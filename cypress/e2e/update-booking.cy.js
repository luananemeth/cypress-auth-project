/// <reference types="cypress"/>

describe("Update Booking", () => {
  var token = null;

  before("CreateToken", () => {
    cy.request({
      method: "POST",
      url: "https://restful-booker.herokuapp.com/auth",
      body: {
        username: "admin",
        password: "password123",
      },
    }).then((response) => {
      expect(response.status).to.eql(200);
      token = response.body.token;
    });
  });

  it("Update Booking", () => {
    cy.request({
      method: "POST",
      url: "https://restful-booker.herokuapp.com/booking",
      body: {
        firstname: "Luana",
        lastname: "Santos",
        totalprice: 2000,
        depositpaid: true,
        bookingdates: {
          checkin: "2025-03-01",
          checkout: "2025-03-15",
        },
        additionalneeds: "Breakfast",
      },
    }).then((response) => {
      expect(response.status).equal(200);
      expect(response.body).to.have.property("bookingid");
      expect(response.body.booking.totalprice).equal(2000);

      cy.request({
        method: "PUT",
        url: `https://restful-booker.herokuapp.com/booking/${response.body.bookingid}`,
        body: {
          firstname: "Luana",
          lastname: "Santos",
          totalprice: 3500,
          depositpaid: true,
          bookingdates: {
            checkin: "2025-03-01",
            checkout: "2025-03-15",
          },
          additionalneeds: "Breakfast",
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Cookie: "token=" + token,
        },
      }).then((response) => {
        expect(response.status).equal(200);
        expect(response.body.totalprice).equal(3500);
      });
    });
  });
});
