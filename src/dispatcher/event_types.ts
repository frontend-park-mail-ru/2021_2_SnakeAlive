// значения нужны только для отладки через console.log, когда выводятся присвоенные цифры це неудобно

export const enum EventType {
	// page
	INIT_PAGE_REQUEST = 'INIT_PAGE_REQUEST',
	INIT_COUNTRY_PAGE_REQUEST = 'INIT_COUNTRY_PAGE_REQUEST',
	INIT_REGISTER_PAGE_REQUEST = 'INIT_REGISTER_PAGE_REQUEST',
	INIT_LOGIN_PAGE_REQUEST = 'INIT_LOGIN_PAGE_REQUEST',
	INIT_SIGHT_PAGE_REQUEST = 'INIT_SIGHT_PAGE_REQUEST',
	INIT_TRIP_PAGE_REQUEST = 'INIT_TRIP_PAGE_REQUEST',
	INIT_ERROR_PAGE_REQUEST = 'INIT_ERROR_PAGE_REQUEST',
	DESTROY_CURRENT_PAGE_REQUEST = 'DESTROY_CURRENT_PAGE_REQUEST',
	INIT_PROFILE_PAGE_REQUEST = 'INIT_PROFILE_PAGE_REQUEST',
	INIT_ALIEN_PROFILE_PAGE_REQUEST = 'INIT_ALIEN_PROFILE_PAGE_REQUEST',
	INIT_ALBUM_PAGE_REQUEST = 'INIT_ALBUM_PAGE_REQUEST',
	INIT_TRIP_EDIT_PAGE_REQUEST = 'INIT_TRIP_EDIT_PAGE_REQUEST',
	INIT_TAG_PAGE_REQUEST = 'INIT_TAG_PAGE_REQUEST',
	INIT_SEARCH_PAGE_REQUEST = 'INIT_SEARCH_PAGE_REQUEST',

	// header
	REMOVE_HEADER_REQUEST = 'REMOVE_HEADER_REQUEST',
	SET_MAIN_HEADER_REQUEST = 'SET_MAIN_HEADER_REQUEST',
	SET_MAIN_HEADER_EMPTY_REQUEST = 'SET_MAIN_HEADER_EMPTY_REQUEST',
	SET_MAIN_HEADER_LOGGED_RESPONSE = 'SET_MAIN_HEADER_LOGGED_RESPONSE',
	SET_MAIN_HEADER_BASIC_RESPONSE = 'SET_MAIN_HEADER_BASIC_RESPONSE',
	SET_MAIN_HEADER_STRONG_REQUEST = 'SET_MAIN_HEADER_STRONG_REQUEST',
	SET_MAIN_HEADER_EMPTY_RESPONSE = 'SET_MAIN_HEADER_EMPTY_RESPONSE',
	// country
	INIT_COUNTRY_REQUEST = 'INIT_COUNTRY_REQUEST',
	INIT_COUNTRY_RESPONSE = 'INIT_COUNTRY_RESPONSE',
	GET_COUNTRY_CARDS_REQUEST = 'GET_COUNTRY_CARDS_REQUEST',
	GET_COUNTRY_CARDS_RESULT = 'GET_COUNTRY_CARDS_RESULT',
	GET_COUNTRY_CARDS_ERROR = 'GET_COUNTRY_CARDS_ERROR',
	// auth
	SHOW_LOGIN_FORM = 'SHOW_LOGIN_FORM',
	SHOW_REGISTER_FORM = 'SHOW_REGISTER_FORM',
	SUBMIT_LOGIN_DATA = 'SUBMIT_LOGIN_DATA',
	SET_VALIDATION_ERROR_LOGIN = 'SET_VALIDATION_ERROR_LOGIN',
	SUBMIT_REGISTER_DATA = 'SUBMIT_REGISTER_DATA',
	SET_VALIDATION_ERROR_REGISTER = 'SET_VALIDATION_ERROR_REGISTER',
	// sight
	GET_SIGHT_REQUEST = 'GET_SIGHT_REQUEST',
	GET_SIGHT_RESPONSE = 'GET_SIGHT_RESPONSE',
	// trip
	GET_TRIP_REQUEST = 'GET_TRIP_REQUEST',
	GET_TRIP_RESPONSE = 'GET_TRIP_RESPONSE',
	CREATE_TRIP_FORM_REQUEST = 'CREATE_TRIP_FORM_REQUEST',
	CREATE_TRIP_EDIT = 'CREATE_TRIP_EDIT',
	CREATE_TRIP_FORM_SUBMIT = 'CREATE_TRIP_FORM_SUBMIT',
	SHARE_TRIP_REQUEST = 'SHARE_TRIP_REQUEST',
	SHARE_TRIP_RESPONSE = 'SHARE_TRIP_RESPONSE',
	ADD_USER_TO_TRIP_REQUEST = 'ADD_USER_TO_TRIP_REQUEST',
	ADD_USER_TO_TRIP_RESPONSE = 'ADD_USER_TO_TRIP_RESPONSE',
	// UPDATE_CURRENT_TRIP_DAYS = 'UPDATE_CURRENT_TRIP_DAYS',
	RERENDER_TRIP_CARDS = 'RERENDER_TRIP_CARDS',
	GET_TRIP_EDIT_RESPONSE = 'GET_TRIP_EDIT_RESPONSE',
	// редактирование поездки
	DELETE_TRIP = 'DELETE_TRIP',
	ADD_CURRENT_TRIP_PLACE = 'ADD_CURRENT_TRIP_PLACE',
	DELETE_CURRENT_TRIP_PLACE = 'DELETE_CURRENT_TRIP_PLACE',
	UPDATE_CURRENT_TRIP_INFO = 'UPDATE_CURRENT_TRIP_INFO',
	SEND_TRIP = 'SEND_TRIP',
	DEL_CURRENT_TRIP_PLACE = 'DEL_CURRENT_TRIP_PLACE',
	WS_UPDATE = 'WS_UPDATE',
	// profile
	GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST',
	GET_PROFILE_RESPONSE = 'GET_PROFILE_RESPONSE',
	UPDATE_PROFILE_METADATA_REQUEST = 'UPDATE_PROFILE_METADATA_REQUEST',
	UPDATE_PROFILE_PHOTO_REQUEST = 'UPDATE_PROFILE_PHOTO_REQUEST',
	LOGOUT_REQUEST = 'LOGOUT_REQUEST',
	// alien_profile
	GET_ALIEN_PROFILE_RESPONSE = 'GET_ALIEN_PROFILE_RESPONSE',
	GET_ALIEN_PROFILE_REQUEST = 'GET_ALIEN_PROFILE_REQUEST',
	// review
	GET_REVIEWS_REQUEST = 'GET_REVIEWS_REQUEST',
	GET_REVIEWS_RESPONSE = 'GET_REVIEWS_RESPONSE',
	DELETE_REVIEW_REQUEST = 'DELETE_REVIEW',
	CREATE_REVIEW_REQUEST = 'CREATE_REVIEW_REQUEST',
	CREATE_REVIEW_RESPONSE = 'CREATE_REVIEW_RESPONSE',
	CREATE_REVIEW_FORM_RESPONSE = 'CREATE_REVIEW_FORM_RESPONSE',
	CREATE_REVIEW_FORM = 'CREATE_REVIEW_FORM',

	// album
	GET_ALBUM_REQUEST = 'GET_ALBUM_REQUEST',
	GET_ALBUM_RESPONSE = 'GET_ALBUM_RESPONSE',
	RENDER_ALBUM_PHOTOS = 'RENDER_ALBUM_PHOTOS',
	ADD_ALBUM_PHOTOS = 'ADD_ALBUM_PHOTOS',
	DELETE_ALBUM_PHOTOS = 'DELETE_ALBUM_PHOTOS',
	CREATE_ALBUM_FORM_REQUEST = 'CREATE_ALBUM_FORM_REQUEST',
	UPDATE_ALBUM_INFO = 'UPDATE_ALBUM_INFO',
	DELETE_ALBUM = 'DELETE_ALBUM',

	// search
	SEARCH_REQUEST = 'SEARCH_REQUEST',
	GOT_SEARCH_RESULTS = 'GOT_SEARCH_RESULTS',
	SUBMIT_SEARCH_RESULTS = 'SUBMIT_SEARCH_RESULTS',
	// search page
	INIT_EMPTY_SEARCH_PAGE_RESPONSE = 'INIT_EMPTY_SEARCH_PAGE_RESPONSE',
	INIT_EMPTY_SEARCH_PAGE_REQUEST = 'INIT_EMPTY_SEARCH_PAGE_REQUEST',
	SEND_PAGE_SEARCH = 'SEND_PAGE_SEARCH',
	GET_SEARCH_CARDS_RESULT = 'GET_SEARCH_CARDS_RESULT',

	// страница тегов
	INIT_TAG_RESULT = 'INIT_TAG_RESULT',
	GET_TAG_CARDS_RESULT = 'GET_TAG_CARDS_RESULT',
	INIT_TAG_REQUEST = 'INIT_TAG_REQUEST',
}
