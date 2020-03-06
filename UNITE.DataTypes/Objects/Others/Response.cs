﻿using System;

namespace UNITE.DataTypes.Objects.Others
{
    public class Response<T>
    {
        public bool EsCorrecto { get; set; }
        public bool Estado { get; set; }
        public string Mensaje { get; set; }
        public T Valor { set; get; }
        public Response() { }
        public Response(bool esCorrecto) { EsCorrecto = esCorrecto; }
        public Response(bool esCorrecto, T valor) : this(esCorrecto) { Valor = valor; }
        public Response(bool esCorrecto, T valor, string mensaje) : this(esCorrecto) { Valor = valor; Mensaje = mensaje; }
        public Response(bool esCorrecto, T valor, string mensaje, bool estado) : this(esCorrecto) { Valor = valor; Mensaje = mensaje; Estado = estado; }

        public static implicit operator Response<T>(bool v)
        {
            throw new NotImplementedException();
        }
    }
}
