package com.demo.ems.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException  extends RuntimeException{

	private static final long serialVersionUID = -3613805243804570369L;

	public ResourceNotFoundException(String message) {
		super(message);
	}
}
