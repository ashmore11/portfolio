import PropTypes from 'prop-types';

export const TagType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  search_count: PropTypes.number
});

export const LocationType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired
});

export const FreelancerType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  time_updated: PropTypes.string.isRequired,
  time_created: PropTypes.string.isRequired,
  updated_by: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  company_name: PropTypes.string,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string,
  linkedin: PropTypes.string,
  twitter: PropTypes.string,
  website: PropTypes.string,
  favourite: PropTypes.bool,
  rate: PropTypes.number,
  rate_user_currency: PropTypes.number,
  rate_currency: PropTypes.number,
  rate_type: PropTypes.number,
  role: TagType.isRequired,
  location: LocationType.isRequired,
  skills: PropTypes.arrayOf(TagType),
  discipline: TagType.isRequired,
  permalancer: PropTypes.bool.isRequired,
  tried: PropTypes.bool.isRequired,
  availability_start: PropTypes.string,
  availability_end: PropTypes.string,
  availability_notes: PropTypes.string,
  comments: PropTypes.array,
  status: PropTypes.number
});
