import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token')?.slice(1, -1);

  if (token) {
    const clonedRequest = req.clone({
      headers : req.headers.set("authorization", `Bearer ${token}`)
    });

    return next(clonedRequest);
  }

  return next(req);
};
