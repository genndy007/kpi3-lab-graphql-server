const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const axios = require("axios");

const schema = require("./schema");
const Database = require("./database");

// ports for fetching and setting server
const PORT = 11100;

const PORT_DATA = 5000;
const HOST_DATA = "http://localhost";

// database
const db = new Database().getInstance();

// server
const app = express();
app.use(cors());

// main thing for defining queries
const root = {
  // queries
  get_all_apartments: async () => {
    const apas = (await axios.get(`${HOST_DATA}:${PORT_DATA}`)).data.apartments;

    return apas;
  },

  // "apartment_id", "city", "street", "house_num", "floor_num", "room_amt", "square_amt", "cost"
  get_apartment: async ({ apartment_id }) => {
    const apa = await db.apartment.findOne({
      attributes: [
        "apartment_id",
        "city",
        "street",
        "house_num",
        "floor_num",
        "room_amt",
        "square_amt",
        "cost",
      ],
      where: { apartment_id: apartment_id },
    });
    return apa;
  },

  // mutations
  add_apartment: async ({ input }) => {
    const new_apa = await db.apartment.create(input);
    return new_apa;
  },

  add_account: async ({ input }) => {
    const new_acc = await db.account.create(input);
    return new_acc;
  },

  add_booking: async ({ input }) => {
    const new_booking = await db.booking.create(input);
    return new_booking;
  },

  // change_apartment(input: ApartmentInputUpdate, apartment_id: ID): Apartment
  change_apartment: async ({ input, apartment_id }) => {
    const updated_apa = await db.apartment.update(input, {
      where: { apartment_id: apartment_id },
    });
    const apa = await db.apartment.findOne({
      attributes: [
        "apartment_id",
        "city",
        "street",
        "house_num",
        "floor_num",
        "room_amt",
        "square_amt",
        "cost",
      ],
      where: { apartment_id: apartment_id },
    });
    return apa;
  },

  remove_apartment: async ({ apartment_id }) => {
    const old_apa = await db.apartment.findOne({
      attributes: [
        "apartment_id",
        "city",
        "street",
        "house_num",
        "floor_num",
        "room_amt",
        "square_amt",
        "cost",
      ],
      where: { apartment_id: apartment_id },
    });
    const deleted_apa = await db.apartment.destroy({
      where: { apartment_id: apartment_id },
    });
    return old_apa;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);

app.listen(PORT, () => console.log(` run on http://localhost:${PORT}`));
