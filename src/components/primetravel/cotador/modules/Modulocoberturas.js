import {
    AlarmClockOff,
    Ambulance,
    Baby,
    Ban,
    BriefcaseMedical,
    CarFront,
    CircleDollarSign,
    HeartPulse,
    Hospital,
    Hotel,
    House,
    Info,
    ListFilter,
    Luggage,
    MapPin,
    PiggyBank,
    Pill,
    Scale,
    Shield,
    TicketsPlane,
    UserRound,
    X
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBusinessTime, faTooth } from "@fortawesome/free-solid-svg-icons";
import { faCross } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";

import React from "react";

const CoverageData = [
    {
        description: (
            <>
                <div className="text-start">
                    <BriefcaseMedical className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Despesas médico-hospitalares em viagem - Sendo esta a soma da cobertura básica e complementar
                </div>
            </>
        ),
        plans: ["R$ 30.000,00", "R$ 60.000,00", "$ 40.000,00", "$ 80.000,00", "$ 150.000,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <BriefcaseMedical className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Cobertura Básica: Cobertura para doenças preexistentes, gravidez até 34 semanas e prorrogação involuntária
                </div>
            </>
        ),
        plans: ["R$ 30.000,00", "R$ 60.000,00", "$ 40.000,00", "$ 50.000,00", "$ 50.000,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <BriefcaseMedical className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Cobertura Complementar: Cobertura para gravidez até 34 semanas e prorrogação involuntária
                </div>
            </>
        ),
        plans: ["-", "-", "-", "$ 50.000,00", "$ 50.000,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <Pill className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Despesas farmacêuticas
                </div>
            </>
        ),
        plans: ["R$ 300,00", "R$ 300,00", "$ 800,00", "$ 1.000,00", "$ 1.500,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <FontAwesomeIcon
                        icon={faTooth} className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Despesas odontológicas em viagem
                </div>
            </>
        ),
        plans: ["R$ 300,00", "R$ 300,00", "$ 800,00", "$ 1.500,00", "$ 2.000,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <FontAwesomeIcon
                        icon={faCross} className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Morte acidental em viagem ao exterior
                </div>
            </>
        ),
        plans: ["R$ 25.000,00", "R$ 25.000,00", "$ 20.000,00", "$ 30.000,00", "$ 60.000,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <CarFront className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Invalidez permanente e total por acidente em viagem
                </div>
            </>
        ),
        plans: ["R$ 25.000,00", "R$ 25.000,00", "$ 20.000,00", "$ 30.000,00", "$ 60.000,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <Hospital className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Translado Médico
                </div>
            </>
        ),
        plans: ["R$ 5.000,00", "R$ 5.000,00", "$ 50.000,00", "$ 80.000,00", "$ 150.000,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <HeartPulse className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Translado de corpo
                </div>
            </>
        ),
        plans: ["R$ 15.000,00", "R$ 15.000,00", "$ 40.000,00", "$ 60.000,00", "$ 60.000,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <FontAwesomeIcon
                        icon={faBed} className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Visita ao Segurado Hospitalizado
                </div>
            </>
        ),
        plans: ["R$ 1.000,00", "R$ 1.000,00", "$ 2.000,00", "$ 2.200,00", "$ 2.200,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <Baby className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Acompanhamento de Menores e Seniores
                </div>
            </>
        ),
        plans: ["R$ 2.000,00", "R$ 2.000,00", "$ 2.000,00", "$ 2.500,00", "$ 3.000,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <div>
                        <House className="inline-block w-5 h-5 text-bluePrime mr-2" />
                        Regresso do segurado
                        <br />
                        <p className="ml-7">Regresso devido a acidente/enfermidade que impossibilite a continuidade da viagem.</p>

                        <p className="ml-7">Regresso devido a morte ou doença de familiar.</p>

                        <p className="ml-7">Regresso devido a notificação judicial improrrogável.</p>

                        <p className="ml-7">Retorno por sinistro no Domicílio.</p>
                    </div>
                </div>
            </>
        ),
        plans: ["R$ 2.000,00", "R$ 2.000,00", "$ 2.000,00", "$ 2.500,00", "$ 2.500,00"],
    },
    {
        description: (
            <>
                <div className="text-start"><Ambulance className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Regresso Sanitário</div>
            </>
        ),
        plans: ["R$ 15.000,00", "R$ 15.000,00", "$ 50.000,00", "$ 100.000,00", "$ 250.000,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <Luggage className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Bagagem
                </div>
            </>
        ),
        plans: ["R$ 1.000,00", "R$ 1.000,00", "$ 3.800,00", "$ 4.275,00", "$ 4.750,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <MapPin className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Compensação por demora na localização de bagagem
                </div>
            </>
        ),
        plans: ["-", "-", "R$ 300,00", "$ 400,00", "$ 500,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <Ban className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Cancelamento de viagem ao exterior
                </div>
            </>
        ),
        plans: ["R$ 1.200,00", "R$ 1.200,00", "$ 4.000,00", "$ 4.000,00", "$ 4.000,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <AlarmClockOff className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Interrupção de viagem ao exterior
                </div>
            </>
        ),
        plans: ["R$ 1.200,00", "R$ 1.200,00", "$ 4.000,00", "$ 4.000,00", "$ 4.000,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <FontAwesomeIcon
                        icon={faBusinessTime} className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Atraso de Embarque
                </div>
            </>
        ),
        plans: ["R$ 300,00", "R$ 300,00", "-", "-", "-"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <Hotel className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Hospedagem após alta hospitalar
                </div>
            </>
        ),
        plans: ["2 dias | R$ 175,00", "2 dias | R$ 175,00", "10 dias | $ 150,00", "10 dias | $ 150,00", "10 dias | $ 200,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <UserRound className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Hospedagem de acompanhante
                </div>
            </>
        ),
        plans: ["-", "-", "5 dias | $ 150,00", "5 dias | $ 150,00", "5 dias | $ 200,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <TicketsPlane className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Reembolso por Gastos de Emissão de Passaporte Provisório
                </div>
            </>
        ),
        plans: ["-", "-", "$ 500,00", "$ 500,00", "$ 800,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <CircleDollarSign className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Adiantamento de Fiança
                </div>
            </>
        ),
        plans: ["-", "-", "$ 12.000,00", "$ 12.000,00", "$ 12.000,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <PiggyBank className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Adiantamento de Fundos no Exterior
                </div>
            </>
        ),
        plans: ["-", "-", "$ 3.000,00", "$ 3.500,00", "$ 5.000,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <Scale className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Assistência Jurídica em acidentes de trânsito
                </div>
            </>
        ),
        plans: ["-", "-", "$ 1.500,00", "$ 1.500,00", "$ 2.000,00"],
    },
    {
        description: (
            <>
                <div className="text-start">
                    <Ban className="inline-block w-5 h-5 text-bluePrime mr-2" />
                    Cancelamento de VIAGEM PREMIUM
                </div>
            </>
        ),
        plans: ["-", "-", "$ 20.000,00", "$ 20.000,00", "$ 20.000,00"],
    },
];

export default CoverageData;