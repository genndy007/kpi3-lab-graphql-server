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

    input ApartmentInput {
        apartment_id: ID
        city: String!
        street: String!
        house_num: Int!
        room_amt: Int!
        square_amt: Int!
        cost: Int!
    }

    type Query {
        get_all_apartments: [Apartment]
        get_apartment(apartment_id: ID): Apartment
        remove_apartment(apartment_id: ID): Apartment
    }

    type Mutation {
        add_apartment(input: ApartmentInput): Apartment
    }
`);

module.exports = schema;
