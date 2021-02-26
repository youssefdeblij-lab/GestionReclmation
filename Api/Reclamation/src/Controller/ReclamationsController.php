<?php

namespace App\Controller;

use App\Entity\Reclamations;
use App\Entity\Zonetxt;
use App\Entity\Utilaisateurs;
use App\Entity\Imagereclamation;
use App\Form\Reclamations1Type;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;


#[Route('/reclamations')]
class ReclamationsController extends AbstractController
{
    #[Route('/', name: 'reclamations_index', methods: ['GET'])]
    public function index(): Response
    {
        $reclamations = $this->getDoctrine()
            ->getRepository(Reclamations::class)
            ->findAll();

        return $this->render('reclamations/index.html.twig', [
            'reclamations' => $reclamations,
        ]);
    }

    #[Route('/new', name: 'reclamations_new', methods: ['GET', 'POST'])]
    public function new(Request $request): Response
    {
        $reclamation = new Reclamations();
        $form = $this->createForm(Reclamations2Type::class, $reclamation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($reclamation);
            $entityManager->flush();

            return $this->redirectToRoute('reclamations_index');
        }

        return $this->render('reclamations/new.html.twig', [
            'reclamation' => $reclamation,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'reclamations_show', methods: ['GET'])]
    public function show(Reclamations $reclamation): Response
    {
        return $this->render('reclamations/show.html.twig', [
            'reclamation' => $reclamation,
        ]);
    }

    #[Route('/{id}/edit', name: 'reclamations_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Reclamations $reclamation): Response
    {
        $form = $this->createForm(Reclamations2Type::class, $reclamation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('reclamations_index');
        }

        return $this->render('reclamations/edit.html.twig', [
            'reclamation' => $reclamation,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'reclamations_delete', methods: ['DELETE'])]
    public function delete(Request $request, Reclamations $reclamation): Response
    {
        if ($this->isCsrfTokenValid('delete'.$reclamation->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($reclamation);
            $entityManager->flush();
        }

        return $this->redirectToRoute('reclamations_index');
    }
	
	#[Route('/Get/all', name: 'getAll', methods: ['GET'])]
    public function getAll(): Response
    { 
		$entityManager = $this->getDoctrine()->getManager();

		$encoders = [new XmlEncoder(), new JsonEncoder()];
		$normalizers = [new ObjectNormalizer()];
		$serializer = new Serializer($normalizers, $encoders);
	
	    $reclamations = $this->getDoctrine()
            ->getRepository(Reclamations::class)
            ->findAll();
		
		$Zones = $this->getDoctrine()
            ->getRepository(Zonetxt::class)
            ->findAll();	
		
		// $Utilaisateurs = $this->getDoctrine()
            // ->getRepository(Utilaisateurs::class)
            // ->findAll();
			
			
		$query = $entityManager->createQuery('SELECT u.id, u.nom FROM App\Entity\Utilaisateurs u');

        // returns an array of Product objects
        $Utilaisateurs = $query->getResult();
			
			
			
		$ZonesAlls = $serializer->serialize($Zones, 'json');
		$reclamations = $serializer->serialize($reclamations, 'json');
		$Utils = $serializer->serialize($Utilaisateurs, 'json');
		
		
		$response = new Response();
		
		$response->setContent('{"Zones" : ' .$ZonesAlls . ',"Reclamations": '  .$reclamations . ' , "Utils": ' . $Utils . ' }');
		$response->headers->set('Content-Type', 'application/json');	
		$response->headers->set('Access-Control-Allow-Origin', '*');
		$response->send();
		 
        return new Response(); 
	
    }
	#[Route('/GetBy/{id}', name: 'getByid', methods: ['GET'])]
    public function getByid(int $id): Response
    { 
	
		$encoders = [new XmlEncoder(), new JsonEncoder()];
		$normalizers = [new ObjectNormalizer()];
		$serializer = new Serializer($normalizers, $encoders);
		
		$entityManager = $this->getDoctrine()->getManager();
		
		$reclamation  = $this->getDoctrine()
            ->getRepository(Reclamations::class)
            ->findOneBy(["id" => $id]);
			
		
		
		$response = new Response();
		$idZone = $reclamation->getIdzone();
		
		$zone  = $this->getDoctrine()
            ->getRepository(Zonetxt::class)
            ->findOneBy(["id" => $idZone]);
		
		
		$idUApar = $reclamation->getAjoutepar();
		$idURpar = $reclamation->getResolupar();
		
		$query = $entityManager->createQuery('SELECT u.id, u.nom FROM App\Entity\Utilaisateurs u where u.id='. $idUApar . ' or u.id=' . $idURpar );
		$Utilaisateurs = $query->getResult();
		
		
		
		$idreclam = $reclamation->getId();
		
		$imgs  = $this->getDoctrine()
            ->getRepository(Imagereclamation::class)
            ->findBy(["idreclamation" => $idreclam ]);
		
		
		$Utils = $serializer->serialize($Utilaisateurs, 'json');
		$ZonesAlls = $serializer->serialize($zone, 'json');
		$recl = $serializer->serialize($reclamation, 'json');
		$imags = $serializer->serialize($imgs, 'json');
		
		


		
		//$response->setContent('{"Zones" : ' .$ZonesAlls . ',"Reclamations": '  .$reclamations . ' , "Utils": ' . $Utils . ' }');
		$response->setContent('{"Zone" : ' .$ZonesAlls . ',"Reclamation": '  .$recl . ' , "Utils": ' . $Utils . ' , "Images" :' . $imags . '}');
		$response->headers->set('Content-Type', 'application/json');	
		$response->headers->set('Access-Control-Allow-Origin', '*');
		$response->send();
		 
        return new Response(); 
		
		
		
		
	
	}
	
	#[Route('/Setdata/new', name: 'Setdata', methods: ['POST'])]
    public function Setdata(Request $request): Response
    {
		$reclamation = new Reclamations();
		$response = new Response();
		$content  = json_decode($request->getContent());
		
		$reclamation->setDate($content->date);
		$reclamation->setAjoutepar($content->ajoutpar);
		$reclamation->setResolupar(0);
		$reclamation->setCommentaire($content->commentaire);
		$reclamation->setStatus(0);
		$reclamation->setIdzone($content->idzone);
		
		 
		
		$entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($reclamation);
        $entityManager->flush();
		
		$idrec = $reclamation->getId();
		
		 
		
		$response->setContent('{"Status":"ok","idReclamation" : "' .$idrec . '"}' );
		$response->headers->set('Content-Type', 'application/json');	
		$response->headers->set('Access-Control-Allow-Origin', '*');
		$response->send();
		 
        return new Response(); 
		
		
		

	}
	
	
	
	
}
