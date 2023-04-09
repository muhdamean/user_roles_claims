--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Homebrew)
-- Dumped by pg_dump version 14.7 (Homebrew)

-- Started on 2023-04-09 10:44:36 WAT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "roles-claimsdb";
--
-- TOC entry 3625 (class 1262 OID 32797)
-- Name: roles-claimsdb; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE "roles-claimsdb" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';


\connect -reuse-previous=on "dbname='roles-claimsdb'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 3626 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 32823)
-- Name: pages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages (
    id integer NOT NULL,
    name character varying,
    description character varying
);


--
-- TOC entry 213 (class 1259 OID 32822)
-- Name: pages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.pages ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.pages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 211 (class 1259 OID 32809)
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    role character varying,
    status boolean DEFAULT false
);


--
-- TOC entry 210 (class 1259 OID 32808)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.roles ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 32831)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id integer NOT NULL,
    email character varying,
    role_id integer,
    page_id integer,
    creates boolean DEFAULT false,
    updates boolean DEFAULT false,
    deletes boolean DEFAULT false
);


--
-- TOC entry 215 (class 1259 OID 32830)
-- Name: user_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 209 (class 1259 OID 32798)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    email character varying,
    status boolean DEFAULT false,
    id integer NOT NULL
);


--
-- TOC entry 212 (class 1259 OID 32815)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3617 (class 0 OID 32823)
-- Dependencies: 214
-- Data for Name: pages; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.pages OVERRIDING SYSTEM VALUE VALUES (3, '/pages', 'Pages section');
INSERT INTO public.pages OVERRIDING SYSTEM VALUE VALUES (4, '/users', 'users page');
INSERT INTO public.pages OVERRIDING SYSTEM VALUE VALUES (5, '/users/roles', 'Users roles');
INSERT INTO public.pages OVERRIDING SYSTEM VALUE VALUES (6, '/page1', 'demo page 1');
INSERT INTO public.pages OVERRIDING SYSTEM VALUE VALUES (7, '/page2', 'demo page 2');
INSERT INTO public.pages OVERRIDING SYSTEM VALUE VALUES (8, '/page3', 'demo page 3');


--
-- TOC entry 3614 (class 0 OID 32809)
-- Dependencies: 211
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.roles OVERRIDING SYSTEM VALUE VALUES (2, 'Admin', true);
INSERT INTO public.roles OVERRIDING SYSTEM VALUE VALUES (3, 'User', true);


--
-- TOC entry 3619 (class 0 OID 32831)
-- Dependencies: 216
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_roles OVERRIDING SYSTEM VALUE VALUES (3, 'test2@mail.com', 2, 3, true, true, true);
INSERT INTO public.user_roles OVERRIDING SYSTEM VALUE VALUES (4, 'test2@mail.com', 2, 4, true, true, NULL);
INSERT INTO public.user_roles OVERRIDING SYSTEM VALUE VALUES (5, 'test1@mail.com', 2, 5, true, true, true);
INSERT INTO public.user_roles OVERRIDING SYSTEM VALUE VALUES (6, 'test@mail.com', 2, 5, true, true, true);
INSERT INTO public.user_roles OVERRIDING SYSTEM VALUE VALUES (7, 'test@mail.com', 3, 6, true, false, false);


--
-- TOC entry 3612 (class 0 OID 32798)
-- Dependencies: 209
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES ('test@mail.com', true, 1);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES ('test1@mail.com', true, 2);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES ('test2@mail.com', true, 3);


--
-- TOC entry 3627 (class 0 OID 0)
-- Dependencies: 213
-- Name: pages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pages_id_seq', 8, true);


--
-- TOC entry 3628 (class 0 OID 0)
-- Dependencies: 210
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- TOC entry 3629 (class 0 OID 0)
-- Dependencies: 215
-- Name: user_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_roles_id_seq', 7, true);


--
-- TOC entry 3630 (class 0 OID 0)
-- Dependencies: 212
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- TOC entry 3472 (class 1259 OID 32821)
-- Name: users_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_id_idx ON public.users USING btree (id);


-- Completed on 2023-04-09 10:44:36 WAT

--
-- PostgreSQL database dump complete
--

