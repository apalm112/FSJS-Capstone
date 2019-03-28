'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var SchoolSchema = new Schema({
	grade_levels: { type: String },
	k_12_enrollment: { type: Number },
	location_1: {
		coordinates: { type: [ Number ] },
	},
	location_1_address: { type: String },
	location_1_city: { type: String },
	number_complete_for_all_immunizations: { type: Number },
	number_exempt_for_diphtheria_tetanus: { type: Number },
	number_exempt_for_hepatitisb: { type: Number },
	number_exempt_for_measles_mumps_rubella: { type: Number },
	number_exempt_for_pertussis: { type: Number },
	number_exempt_for_polio: { type: Number },
	number_exempt_for_varicella: { type: Number },
	number_with_any_exemption: { type: Number },
	number_with_medical_exemption: { type: Number },
	number_with_personal_exemption: { type: Number },
	number_with_religious_exemption: { type: Number },
	number_with_religious_membership_exemption: { type: Number },
	percent_complete_for_all_immunizations: { type: Number },
	percent_exempt_for_diphtheria_tetanus: { type: Number },
	percent_exempt_for_hepatitisb: { type: Number },
	percent_exempt_for_measles_mumps_rubella: { type: Number },
	percent_exempt_for_pertussis: { type: Number },
	percent_exempt_for_polio: { type: Number },
	percent_exempt_for_varicella: { type: Number },
	percent_with_any_exemption: { type: Number },
	percent_with_medical_exemption: { type: Number },
	percent_with_personal_exemption: { type: Number },
	percent_with_religious_exemption: { type: Number },
	percent_with_religious_membership_exemption: { type: Number },
	reported: { type: String },
	school_district: { type: String },
	school_name: { type: String },
	school_year: { type: String }
});

var School = mongoose.model('School', SchoolSchema);

module.exports.School = School;
