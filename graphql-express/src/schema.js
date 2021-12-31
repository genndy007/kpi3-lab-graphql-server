const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Apartment {
        apartment_id: ID
        city: String
        street: String
        house_num: Int
        room_amt: Int
        square_amt: Int
        cost: Int
    }

    type Account {
      user_id: ID
      last_name: String
      first_name: String
      email: String
      phone: String
    }

    type Booking {
      booking_id: ID
      apartment_id: Int
      user_id: Int
      profit: Int
    }

    input ApartmentInput {
        apartment_id: ID
        city: String!
        street: String!
        house_num: Int!
        room_amt: Int!
        square_amt: Int!
        cost: Int!
    }

    input ApartmentInputUpdate {
      apartment_id: ID
      city: String
      street: String
      house_num: Int
      room_amt: Int
      square_amt: Int
      cost: Int
    }

    input AccountInput {
      user_id: ID
      last_name: String!
      first_name: String!
      email: String!
      phone: String!
    }

    input BookingInput {
      booking_id: ID
      apartment_id: Int!
      user_id: Int!
      profit: Int!
    }

    input BookingInputUpdate {
      booking_id: ID
      apartment_id: Int
      user_id: Int
      profit: Int
    }

    type Query {
        get_all_apartments: [Apartment]
        get_apartment(apartment_id: ID): Apartment
    }

    type Mutation {
        add_apartment(input: ApartmentInput): Apartment
        add_account(input: AccountInput): Account
        add_booking(input: BookingInput): Booking
        change_apartment(input: ApartmentInputUpdate, apartment_id: ID): Apartment
        remove_apartment(apartment_id: ID): Apartment
    }
`);

module.exports = schema;
