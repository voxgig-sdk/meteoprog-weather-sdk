package core

type MeteoprogWeatherError struct {
	IsMeteoprogWeatherError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewMeteoprogWeatherError(code string, msg string, ctx *Context) *MeteoprogWeatherError {
	return &MeteoprogWeatherError{
		IsMeteoprogWeatherError: true,
		Sdk:              "MeteoprogWeather",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *MeteoprogWeatherError) Error() string {
	return e.Msg
}
