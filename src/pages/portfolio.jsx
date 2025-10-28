import { Button } from "@/components/base/buttons/button.tsx";
import {
  ButtonGroup,
  ButtonGroupItem,
} from "@/components/base/buttons/button-group";
import { Badge } from "@/components/base/badges/badges";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center space-y-6">
      <div>
        <h1 className="text-display-sm font-semibold text-gray-900">
          Camilo Mora - Product Designer
        </h1>
        <p className="text-gray-600 max-w-md">
          Passionate about creating user-centered designs that solve real
          problems and enhance user experiences.
        </p>
      </div>
      <div className="space-y-6 max-w-xl px-6">
        <ButtonGroup>
          <ButtonGroupItem>UI Design</ButtonGroupItem>
          <ButtonGroupItem>UX Design</ButtonGroupItem>
          <ButtonGroupItem>Product Design</ButtonGroupItem>
        </ButtonGroup>
      </div>

      {/* Timeline item: Lirmi.com */}
      <div className="w-full max-w-3xl mx-auto">
        <div className="grid grid-cols-[80px_24px_1fr_auto] items-start gap-4">
          {/* Columna 1: Fecha */}
          <div className="text-sm text-gray-500">2022 - Actualidad</div>

          {/* Columna 2: Punto en la timeline */}
          <div className="flex justify-center">
            <span className="w-2 h-2 bg-gray-400 rounded-full mt-1" />
          </div>

          {/* Columna 3: Card (texto alineado a la izquierda) */}
          <div className="bg-white/80 rounded-xl shadow-xl p-4 text-left">
            <h2 className="text-base font-semibold text-gray-900">
              Lirmi.com, Sistema de Gestión Escolar
            </h2>
            <div className="flex gap-2 mt-2">
              <Badge type="pill-color" color="brand" size="md">
                UI/UX design
              </Badge>
              <Badge type="pill-color" color="brand" size="md">
                Product Design
              </Badge>
            </div>
            <p className="text-base font-light text-gray-600 leading-relaxed mt-3">
              Diseñador de producto en el equipo de Lirmi, plataforma EdTech con
              presencia en Chile y México. Lideré la creación del primer sistema
              de diseño para Lirmi Global. Colaboro con Product Owners en
              investigación, definición y prototipado de soluciones.
            </p>
            <p className="mt-3 font-medium text-gray-900">
              Productos diseñados junto a Lirmi:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              <li className="text-sm text-gray-600 break-normal">
                Producto de Convivencia Escolar.{" "}
                <Button
                  href="https://www.lirmi.com/convivencia_escolar"
                  color="link-gray"
                  size="sm"
                >
                  Ver proyecto
                </Button>
              </li>
              <li className="text-sm text-gray-600 break-normal">
                Producto Financiero.{" "}
                <Button
                  href="https://sitio.lirmi.com/financiero"
                  color="link-gray"
                  size="sm"
                >
                  Ver proyecto
                </Button>
              </li>
              <li className="text-sm text-gray-600 break-normal">
                Módulo Admisión.{" "}
                <Button
                  href="https://www.lirmi.com/admision_2024"
                  color="link-gray"
                  size="sm"
                >
                  Ver proyecto
                </Button>
              </li>
            </ul>
            <p className="text-base font-light text-gray-600 mt-3">
              Actualmente, estos productos son utilizados por miles de usuarios
              en Chile y México.
            </p>
          </div>

          {/* Columna 4: Botón ver más */}
          <div className="flex items-start">
            <Button color="tertiary" size="md">
              Ver más
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
