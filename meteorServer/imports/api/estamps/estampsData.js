/**
 * Created by 128183 on 1/18/2017.
 */
import { Mongo } from "meteor/mongo";
import moment from "moment";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import Text from "simple-react-form-material-ui/lib/text";
import Textarea from "simple-react-form-material-ui/lib/textarea";
import DatePicker from "simple-react-form-material-ui/lib/date-picker";
import HiddenField from "../../ui/components/HiddenField";

const estampsData = new Mongo.Collection('estamps');

estampsData.allow({
  update: () => true,
  insert: () => true,
},
);
estampsData.attachSchema(new SimpleSchema({
  title: {
    type: String,
    srf: {
      type: Text,
    },
  },
  description: {
    type: String,
    srf: {
      type: Textarea,
      rows: 3,
    },
  },
  start_date: {
    type: Date,
    min: new Date(),
    srf: {
      type: DatePicker,
      minDate: new Date(),
      formatDate: date => moment(date).format('LL'),
    },
  },
  valid_date: {
    type: Date,
    min: new Date(),
    srf: {
      type: DatePicker,
      minDate: new Date(),
      formatDate: date => moment(date).format('LL'),
    },
  },
  max: {
    type: Number,
    srf: {
      type: Text,
      fieldType: 'number',
    },
  },
  createdAt: {
    type: Date,
    srf: {
      type: HiddenField,
    },
    autoValue () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } 
      this.unset();  // Prevent user from supplying their own value
    },
  },
  marchentId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    srf: {
      type: HiddenField,
    },
    autoValue () {
      return this.userId;
    },
  },

}));

export default estampsData;
