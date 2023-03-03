--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: shortys; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shortys (
    id integer NOT NULL,
    user_id integer,
    url_id integer,
    shorted_url text NOT NULL,
    views bigint DEFAULT '0'::bigint NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: shortys_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shortys_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shortys_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shortys_id_seq OWNED BY public.shortys.id;


--
-- Name: tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tokens (
    id integer NOT NULL,
    user_id integer,
    token text NOT NULL
);


--
-- Name: tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tokens_id_seq OWNED BY public.tokens.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    user_id integer,
    url text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    senha text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: shortys id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortys ALTER COLUMN id SET DEFAULT nextval('public.shortys_id_seq'::regclass);


--
-- Name: tokens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tokens ALTER COLUMN id SET DEFAULT nextval('public.tokens_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: shortys; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.tokens VALUES (1, 1, 'b2f6f9b8-447f-4406-9c81-b92866a49823');
INSERT INTO public.tokens VALUES (2, 1, '523a2377-6797-4143-a0a4-7a18fc04056c');
INSERT INTO public.tokens VALUES (3, 1, '53a7a4dc-be37-405c-989e-e2de08e5cebe');
INSERT INTO public.tokens VALUES (4, 1, '8542d468-4420-4d0d-98ae-26c424454fed');
INSERT INTO public.tokens VALUES (5, 1, '95b8d7a1-3efd-4dd3-9754-f5559a3a7e58');
INSERT INTO public.tokens VALUES (6, 1, '2d221fc6-00ae-43e3-aa2e-2837499eea27');
INSERT INTO public.tokens VALUES (7, 1, 'f255244e-89d6-4e49-9956-d0fde0e15e67');
INSERT INTO public.tokens VALUES (8, 1, 'b3ead7ee-dc31-4ddd-8d6e-5f27ad703123');
INSERT INTO public.tokens VALUES (9, 1, '0b1cba1c-b844-46e8-96f2-5d3cf5a0b61e');
INSERT INTO public.tokens VALUES (10, 1, '491b4918-cc42-453b-b0f5-d9e345b6c356');
INSERT INTO public.tokens VALUES (11, 1, '30f6683a-d290-46e2-8401-86599b103501');
INSERT INTO public.tokens VALUES (12, 1, 'd1f3fbb8-a248-46ef-a83f-f7ba54d9851b');
INSERT INTO public.tokens VALUES (13, 1, 'ae0fcfc3-80b8-44f1-af29-3c7076a41bb7');
INSERT INTO public.tokens VALUES (14, 1, '988b19cc-bb8d-44e0-88db-be23640eeff9');
INSERT INTO public.tokens VALUES (15, 1, '2769421a-1026-41f2-a439-61843e7bc552');
INSERT INTO public.tokens VALUES (16, 1, 'ada81482-f192-48bc-a426-2fad30b6c80f');
INSERT INTO public.tokens VALUES (17, 1, 'b8fcc755-09c6-484e-abeb-e9ee9b3c645a');
INSERT INTO public.tokens VALUES (18, 1, 'e78dab97-53c6-4f3a-87ea-3bacecd4e2ef');
INSERT INTO public.tokens VALUES (19, 1, '1ab98fcc-0b85-4867-a596-0c246309d2ad');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'cc', 'a@a.com', 'aaa', '2023-03-03 03:42:11.73041');


--
-- Name: shortys_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.shortys_id_seq', 1, false);


--
-- Name: tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tokens_id_seq', 19, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: shortys shortys_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortys
    ADD CONSTRAINT shortys_pkey PRIMARY KEY (id);


--
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: shortys shortys_url_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortys
    ADD CONSTRAINT shortys_url_id_fkey FOREIGN KEY (url_id) REFERENCES public.urls(id);


--
-- Name: shortys shortys_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortys
    ADD CONSTRAINT shortys_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: tokens tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: urls urls_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

